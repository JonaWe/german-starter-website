import { useEffect, useState } from 'react';

import Link from 'next/link';

import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from 'react-query';

import { auth } from '../../../firebase/clientApp';
import useAdmin from '../../../hooks/useAdmin';
import getAxios from '../../../lib/axios';
import Button from '../../UI/Button';
import InfoBox from '../../UI/Info';
import LogItem, { EventType } from './LogItem';

export default function CombatLog({ steamid }: { steamid: string }) {
  const { ref, inView } = useInView();

  const [admin] = useAdmin(auth.currentUser);

  const [restricted, setRestricted] = useState(false);

  const PAGE_SIZE = 10;
  const FETCH_ON_ITEM = 10;

  const { status, data, error, refetch, fetchNextPage } = useInfiniteQuery(
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
          <ul className="flex flex-col h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-background-600">
            {status === 'loading'
              ? loadingData
              : data?.pages.map((page) =>
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
    </div>
  );
}
