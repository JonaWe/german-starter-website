import { useEffect, useRef, useState } from 'react';

import Link from 'next/link';

import { useVirtualizer } from '@tanstack/react-virtual';
import { useInfiniteQuery } from 'react-query';

import useRole from '../../../hooks/useRole';
import getAxios from '../../../lib/axios';
import isAllowedRole from '../../../lib/firebase/isAllowedRole';
import Button from '../../UI/Button';
import InfoBox from '../../UI/Info';
import CombatLogError from './CombatLogError';
import LogItem, { EventType } from './LogItem';

export default function CombatLog({ steamid }: { steamid: string }) {
  const [flatEvents, setFlatEvents] = useState<any>([]);

  const [role] = useRole(null);
  const isAdmin = isAllowedRole(role?.id, 'admin');

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

  useEffect(() => {
    refetch();
  }, [restricted]);

  const loadingData = Array(PAGE_SIZE)
    .fill(0)
    .map((_, i) => (
      <LogItem
        key={i}
        event="PVP_KILL"
        player={''}
        entity={''}
        time={new Date()}
        loading
      />
    ));

  return (
    <div className="relative w-full before:absolute before:inset-x-0 before:bottom-0 before:h-1/6 before:z-10 before:bg-gradient-to-t before:from-background-500">
      {restricted ? 'Restricted view' : 'Full view'}
      <Button text="" onClick={() => setRestricted(!restricted)}>
        Toggle restricted
      </Button>
      {status === 'error' ? (
        <CombatLogError message={String(error)} />
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
                        player={''}
                        entity={''}
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
                        player={
                          isPvEDeath || isPvPDeath
                            ? entry.target_steamid
                            : entry.killer_steamid
                        }
                        entity={
                          isPvEDeath
                            ? entry.reason
                            : isPvPDeath
                            ? entry.killer_steamid
                            : entry.target_steamid
                        }
                        sleeper={entry.sleeper}
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
