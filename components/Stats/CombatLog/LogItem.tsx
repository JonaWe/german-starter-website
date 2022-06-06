import { useRouter } from 'next/router';

import { formatDistance, isSameDay, isSameHour } from 'date-fns';
import { motion } from 'framer-motion';
import {
  GiBodySwapping,
  GiGunshot,
  GiSkullCrack,
  GiSuicide,
  GiWolfTrap,
} from 'react-icons/gi';
import Skeleton from 'react-loading-skeleton';

import useLocalization from '../../../hooks/useLocalization';
import PlayerCell from './Cells/PlayerCell';
import TargetCell from './Cells/TargetCell';
import PrepareText from './PrepareText';

interface LogItemProps {
  event: 'PVP_KILL' | 'PVP_DEATH' | 'PVE_DEATH' | 'NAME_CHANGED';
  time: Date;
  data: EventData;
  restricted?: boolean;
  loading?: boolean;
}

export enum EventType {
  pvp = 'pvp_event',
}

export interface CellProps {
  value: string;
  restricted: boolean;
}

/**
 * @member player is the is always the current watched player
 * @member entry is the other subject involved in the event
 * @member sleeper is optional and is only used to determine if the event involved a sleeper
 */
interface EventData {
  player: Player;
  entity: Entity;
  sleeper?: boolean;
}

interface EventOptions {
  Icon: React.ReactNode;
  text: string;
  EntityCell: ({ value, restricted }: CellProps) => React.ReactNode;
  PlayerCell: ({ value, restricted }: CellProps) => React.ReactNode;
}

interface EventTypes {
  PVP_KILL: EventOptions;
  PVP_DEATH: EventOptions;
  PVE_DEATH: EventOptions;
  NAME_CHANGED: EventOptions;
}

export type Entity = string | null;
export type Player = string | null;

const timeOption: Intl.DateTimeFormatOptions = {
  timeStyle: 'short',
};

const dateOption: Intl.DateTimeFormatOptions = {
  dateStyle: 'long',
};

export default function LogItem({
  event,
  time,
  data,
  restricted = false,
  loading = false,
}: LogItemProps) {
  const t = useLocalization();

  //TODO: optimize EVENTS with useMemo (not sure if it's worth it / possible)
  const EVENTS: EventTypes = {
    PVP_KILL: {
      Icon: (
        <GiGunshot className="text-3xl fill-sand-500/60 group-hover:fill-sand-500 transition-colors" />
      ),
      text: t.stats.combatLog.unRestricted[
        data.sleeper ? 'pvpSleeperKill' : 'pvpKill'
      ],
      EntityCell: TargetCell,
      PlayerCell: PlayerCell,
    },
    PVP_DEATH: {
      Icon: (
        <GiSkullCrack className="text-3xl fill-sand-500/60 group-hover:fill-sand-500 transition-colors" />
      ),
      text: t.stats.combatLog.unRestricted[
        data.sleeper ? 'pvpSleeperDeath' : 'pvpDeath'
      ],
      EntityCell: PlayerCell,
      PlayerCell: PlayerCell,
    },
    PVE_DEATH: {
      Icon:
        data.entity !== 'Suicide' ? (
          <GiWolfTrap className="text-3xl fill-sand-500/60 group-hover:fill-sand-500 transition-colors" />
        ) : (
          <GiSuicide className="text-3xl fill-sand-500/60 group-hover:fill-sand-500 transition-colors" />
        ),
      text: t.stats.combatLog.unRestricted[
        data.sleeper
          ? 'pvpSleeperDeath'
          : data.entity === 'Suicide'
          ? 'suicide'
          : 'pveDeath'
      ],
      EntityCell: PlayerCell,
      PlayerCell: PlayerCell,
    },
    NAME_CHANGED: {
      Icon: (
        <GiBodySwapping className="text-3xl fill-sand-500/60 group-hover:fill-sand-500 transition-colors" />
      ),
      text: "You've changed your name!",
      EntityCell: PlayerCell,
      PlayerCell: PlayerCell,
    },
  };

  const { locales } = useRouter();
  const now = Date.now();

  const timeString = isSameDay(time, now)
    ? isSameHour(time, now)
      ? formatDistance(time, now, {
          addSuffix: true,
        })
      : time.toLocaleTimeString(locales, timeOption)
    : time.toLocaleTimeString(locales, timeOption) +
      '  ' +
      time.toLocaleDateString(locales, dateOption);

  return (
    <li className="pb-10 relative w-full">
      <span className="border-l-4 absolute inset-y-0 translate-x-6 border-background-150/80 z-[1]" />
      <div className="group flex gap-5">
        <div
          className={`bg-background-150 w-14 aspect-square rounded-full flex items-center justify-center group-hover:bg-background-600 transition-all relative z-10`}
        >
          {!loading && (
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {EVENTS[event].Icon}
            </motion.span>
          )}
        </div>
        <div className={`${loading ? 'w-32' : ''} min-w-max`}>
          <span className="text-sm opacity-75 font-light">
            {loading ? <Skeleton /> : timeString}
          </span>
          <div className='flex items-center'>
            {loading ? (
              <Skeleton />
            ) : (
              <PrepareText
                subjects={{
                  player: data.player,
                  entity: data.entity,
                }}
                text={EVENTS[event].text}
                EntityPill={(text) =>
                  EVENTS[event].EntityCell({ value: text || '', restricted })
                }
                PlayerPill={(text) =>
                  EVENTS[event].PlayerCell({ value: text || '', restricted })
                }
              />
            )}
          </div>
        </div>
      </div>
    </li>
  );
}
