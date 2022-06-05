import { useRouter } from 'next/router';

import { formatDistance, isSameDay, isSameHour } from 'date-fns';
import {
  GiBodySwapping,
  GiGunshot,
  GiSkullCrack,
  GiWolfTrap,
} from 'react-icons/gi';

import useLocalization from '../../../hooks/useLocalization';
import PlayerPill from './Pills/PlayerPill';
import TargetPill from './Pills/TargetPill';
import PrepareText from './PrepareText';

interface LogItemProps {
  event: 'PVP_KILL' | 'PVP_DEATH' | 'PVE_DEATH' | 'NAME_CHANGED';
  time: Date;
  data: EventData;
  restricted?: boolean;
}

export enum EventType {
  pvp = 'pvp_event',
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
  EntityPill: ({ text }: { text: string }) => React.ReactNode;
  PlayerPill: ({ text }: { text: string }) => React.ReactNode;
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
      EntityPill: TargetPill,
      PlayerPill: PlayerPill,
    },
    PVP_DEATH: {
      Icon: (
        <GiSkullCrack className="text-3xl fill-sand-500/60 group-hover:fill-sand-500 transition-colors" />
      ),
      text: t.stats.combatLog.unRestricted[
        data.sleeper ? 'pvpSleeperDeath' : 'pvpDeath'
      ],
      EntityPill: PlayerPill,
      PlayerPill: PlayerPill,
    },
    PVE_DEATH: {
      Icon: (
        <GiWolfTrap className="text-3xl fill-sand-500/60 group-hover:fill-sand-500 transition-colors" />
      ),
      text: t.stats.combatLog.unRestricted[
        data.sleeper ? 'pvpSleeperDeath' : 'pvpDeath'
      ],
      EntityPill: PlayerPill,
      PlayerPill: PlayerPill,
    },
    NAME_CHANGED: {
      Icon: (
        <GiBodySwapping className="text-3xl fill-sand-500/60 group-hover:fill-sand-500 transition-colors" />
      ),
      text: "You've changed your name!",
      EntityPill: PlayerPill,
      PlayerPill: PlayerPill,
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
    : time.toLocaleDateString(locales, dateOption);

  return (
    <li>
      <div className="group flex gap-5">
        <div className="bg-background-150/80 w-14 aspect-square rounded-full flex items-center justify-center group-hover:bg-background-150 transition-all">
          {EVENTS[event].Icon}
        </div>
        <div>
          <span className="text-sm opacity-75 font-light">{timeString}</span>
          <p>
            <PrepareText
              subjects={{
                player: data.player,
                entity: data.entity,
              }}
              text={EVENTS[event].text}
              EntityPill={(text) =>
                EVENTS[event].EntityPill({ text: text || '' })
              }
              PlayerPill={(text) =>
                EVENTS[event].PlayerPill({ text: text || '' })
              }
            />
          </p>
        </div>
      </div>
    </li>
  );
}
