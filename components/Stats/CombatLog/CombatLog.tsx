import { useEffect, useState } from 'react';

import Link from 'next/link';

import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from 'react-query';

import getAxios from '../../../lib/axios';
import LogItem, { EventType } from './LogItem';

export default function CombatLog({ steamid }: { steamid: string }) {
  const { ref, inView } = useInView();

  const [restricted, setRestricted] = useState(false);

  const PAGE_SIZE = 10;

  const {
    status,
    data,
    error,
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
      console.log(pageParam);
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
    console.log(error);
  }, [error]);

  return (
    <div className="flex gap-y-10 flex-col">
      <h1>Infinite Loading</h1>
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
          {data?.pages.map((page) => (
            <>
              {page.log.map((entry: any) => {
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
                  entry.killer_steamid === null ||
                  entry.target_steamid === null;

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
                      key={entry.time}
                      event={event}
                      data={{
                        player: isPvEDeath
                          ? entry.target_steamid
                          : entry.killer_steamid,
                        entity: isPvEDeath ? entry.reason : entry.target_steamid,
                        sleeper: entry.sleeper,
                      }}
                      time={new Date(entry.time)}
                      restricted={isRestricted}
                    />
                  </>
                );
              })}
            </>
          ))}
        </>
      )}
      <div>
        <button
          ref={ref}
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
