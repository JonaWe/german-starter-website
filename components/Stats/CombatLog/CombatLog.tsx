import { useEffect, useState } from 'react';

import Link from 'next/link';

import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from 'react-query';

import { auth } from '../../../firebase/clientApp';
import useAdmin from '../../../hooks/useAdmin';
import getAxios from '../../../lib/axios';
import Button from '../../UI/Button';
import LogItem, { EventType } from './LogItem';

export default function CombatLog({ steamid }: { steamid: string }) {
  const { ref, inView } = useInView();

  const [admin] = useAdmin(auth.currentUser);

  const [restricted, setRestricted] = useState(false);

  const PAGE_SIZE = 10;
  const FETCH_ON_ITEM = 10;

  const {
    status,
    data,
    error,
    refetch,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
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
      getNextPageParam: (lastPage) => {
        return lastPage.nextPage ?? undefined;
      },
    }
  );

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  useEffect(() => {
    refetch();
  }, [restricted]);

  return (
    <div className="w-1/3">
      {restricted ? 'Restricted view' : 'Full view'}
      <Button text="" onClick={() => setRestricted(!restricted)}>
        Toggle restricted
      </Button>
      {status === 'loading' ? (
        <p>Loading...</p>
      ) : status === 'error' ? (
        <span>Error: Unable to load log</span>
      ) : (
        <>
          <div>
            <button
              onClick={() => fetchPreviousPage()}
              disabled={!hasPreviousPage || isFetchingPreviousPage}
            >
              {isFetchingPreviousPage
                ? 'Loading more...'
                : hasPreviousPage
                ? 'Load Older'
                : 'Nothing more to load'}
            </button>
          </div>
          <ul className="flex flex-col h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-background-600">
            {data?.pages.map((page) =>
              page.log.map((entry: any, i: number) => {
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
                  <>
                    <LogItem
                      key={entry.time + entry.target_steamid}
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
                    {i + 1 === FETCH_ON_ITEM && <span ref={ref} />}
                  </>
                );
              })
            )}
            <LogItem
              event="PVP_KILL"
              data={{ player: '', entity: '' }}
              time={new Date()}
              loading
            />
          </ul>
        </>
      )}
      <div>
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
            ? 'Load Newer'
            : 'Nothing more to load'}
        </button>
      </div>
      <div>
        {isFetching && !isFetchingNextPage ? 'Background Updating...' : null}
      </div>
    </div>
  );
}
