import { useEffect, useRef, useState } from 'react';

import Link from 'next/link';

import { useVirtualizer } from '@tanstack/react-virtual';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from 'react-query';

import { auth } from '../../../firebase/clientApp';
import useAdmin from '../../../hooks/useAdmin';
import getAxios from '../../../lib/axios';
import Button from '../../UI/Button';
import InfoBox from '../../UI/Info';
import LogItem, { EventType } from './LogItem';

export default function CombatLog({ steamid }: { steamid: string }) {
  const [flatEvents, setFlatEvents] = useState<any>([]);

  const [admin] = useAdmin(auth.currentUser);

  const [restricted, setRestricted] = useState(false);

  const PAGE_SIZE = 5;

  const {
    status,
    data,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    'projects',
    async ({ pageParam = 0 }) => {
      const axios = await getAxios();

      const res = await axios.get(
        `/api/stats/player/combatLog?steamid=${steamid}&limit=${PAGE_SIZE}&restrict=${restricted}&offset=${pageParam}`
      );
      return res.data;
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length ? allPages.length : false;
      },
    }
  );

  //TODO: #19 Fix slow computing of pages to a single array of events
  useEffect(() => {
    setFlatEvents(data ? data.pages.flat(1) : []);
  }, [data]);

  const parentRef = useRef(null);

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? flatEvents.length + 1 : flatEvents.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 90,
  });

  useEffect(() => {
    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();

    if (!lastItem) {
      return;
    }

    if (
      lastItem.index >= flatEvents.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [
    hasNextPage,
    fetchNextPage,
    flatEvents.length,
    isFetchingNextPage,
    rowVirtualizer.getVirtualItems(),
  ]);

  // useEffect(() => {
  //   if (inView) {
  //     fetchNextPage();
  //   }
  // }, [inView]);

  useEffect(() => {
    refetch();
  }, [restricted]);

  const loadingData = Array(PAGE_SIZE)
    .fill(0)
    .map((_, i) => (
      <LogItem
        key={i}
        event="PVP_KILL"
        data={{ player: '', entity: '' }}
        time={new Date()}
        loading
      />
    ));

  return (
    <div className="w-full">
      {restricted ? 'Restricted view' : 'Full view'}
      <Button text="" onClick={() => setRestricted(!restricted)}>
        Toggle restricted
      </Button>
      {status === 'error' ? (
        <InfoBox
          info={
            <span>
              Unable to load log!{' '}
              <Link
                href={`/support/feedback?description=${
                  'unable fetch log data: ' + String(error)
                }`}
              >
                <a className="text-blue-500 underline">Report this issue</a>
              </Link>
            </span>
          }
          className="m-5"
          type={'error'}
        />
      ) : (
        <>
          <ul
            ref={parentRef}
            className="flex flex-col h-96 scrollbar-thin scrollbar-thumb-background-600"
            style={{
              height: `500px`,
              width: `100%`,
              overflow: 'auto',
            }}
          >
            {status === 'loading' ? (
              loadingData
            ) : (
              <div
                style={{
                  height: `${rowVirtualizer.getTotalSize()}px`,
                  width: '100%',
                  position: 'relative',
                }}
              >
                {rowVirtualizer.getVirtualItems().map((virtualRow: any) => {
                  const isLoaderRow = virtualRow.index > flatEvents.length - 1;
                  const entry = flatEvents[virtualRow.index];

                  if (isLoaderRow)
                    return (
                      <LogItem
                        key={virtualRow.index}
                        event="PVP_KILL"
                        data={{ player: '', entity: '' }}
                        time={new Date()}
                        loading
                      />
                    );

                  const isKill =
                    entry.reason === EventType.pvp &&
                    entry.killer_steamid === steamid;

                  const isPvPDeath =
                    entry.reason === EventType.pvp &&
                    entry.target_steamid === steamid;

                  const isPvEDeath =
                    entry.reason !== EventType.pvp &&
                    entry.target_steamid === steamid;

                  const isRestricted =
                    (entry.killer_steamid === null ||
                      entry.target_steamid === null) &&
                    !isPvEDeath;

                  const event = isKill
                    ? 'PVP_KILL'
                    : isPvPDeath
                    ? 'PVP_DEATH'
                    : isPvEDeath
                    ? 'PVE_DEATH'
                    : 'NAME_CHANGED';

                  return (
                    <li
                      key={virtualRow.index}
                      className={
                        virtualRow.index % 2 ? 'ListItemOdd' : 'ListItemEven'
                      }
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: `${virtualRow.size}px`,
                        transform: `translateY(${virtualRow.start}px)`,
                      }}
                    >
                      <LogItem
                        event={event}
                        data={{
                          player:
                            isPvEDeath || isPvPDeath
                              ? entry.target_steamid
                              : entry.killer_steamid,
                          entity: isPvEDeath
                            ? entry.reason
                            : isPvPDeath
                            ? entry.killer_steamid
                            : entry.target_steamid,
                          sleeper: entry.sleeper,
                        }}
                        time={new Date(entry.time)}
                        restricted={isRestricted}
                      />
                    </li>
                  );
                })}
              </div>
            )}
          </ul>
        </>
      )}
    </div>
  );
}
