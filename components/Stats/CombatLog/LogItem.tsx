import { useRouter } from 'next/router';

import { formatDistance, isSameDay, isSameHour } from 'date-fns';
import {
  GiBodySwapping,
  GiGunshot,
  GiSkullCrack,
  GiWolfTrap,
} from 'react-icons/gi';
import reactStringReplace from 'react-string-replace';

import useLocalization from '../../../hooks/useLocalization';

interface LogItemProps {
  event: 'PVP_KILL' | 'PVP_DEATH' | 'PVE_DEATH' | 'NAME_CHANGED';
  time: Date;
  data: EventData;
  restricted?: boolean;
}

enum EventType {
  pvp = 'pvp_event',
}
/**
 * PLayer is the is always the current watched player
 * entry is the other subject involved in the event
 * sleeper is optional and is only used for
 */
interface EventData {
  player: Player;
  entity: Entity;
  time: string;
  sleeper?: boolean;
  reason?: string;
}

type Entity = string | null;
type Player = string | null;

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

  const EVENTS = {
    PVP_KILL: {
      icon: (
        <GiGunshot className="text-3xl fill-sand-500/60 group-hover:fill-sand-500 transition-colors" />
      ),
      unRestricted: (
        subjects: { player: Player; entity: Entity },
        sleeper: boolean = false
      ) => {
        const snippets =
          t.stats.combatLog.unRestricted[
            sleeper ? 'pvpSleeperKill' : 'pvpKill'
          ].split('$');

        return (
          <>
            {/* <span className="text-green-500">{player}</span>
            {snippets[0]}
            <span className="text-red-500">{entity}</span>
            {snippets[1]} */}
            {reactStringReplace(
              t.stats.combatLog.unRestricted[
                sleeper ? 'pvpSleeperKill' : 'pvpKill'
              ],
              /(\${\w+})/g,
              (match, i) => (
                <span key={i} style={{ color: 'red' }}>
                  {match.replace('${', '').replace('}', '')}
                </span>
              )
            )}
          </>
        );
      },
    },
    PVP_DEATH: {
      icon: (
        <GiSkullCrack className="text-3xl fill-sand-500/60 group-hover:fill-sand-500 transition-colors" />
      ),
      unRestricted: (
        player: Player,
        entity: Entity,
        sleeper: boolean = false
      ) => {
        const snippets =
          t.stats.combatLog.unRestricted[
            sleeper ? 'pvpSleeperDeath' : 'pvpDeath'
          ];

        return (
          <>
            <span className="text-green-500">{player}</span>
            {snippets[0]}
            <span className="text-red-500">{entity}</span>
            {snippets[1]}
          </>
        );
      },
    },
    PVE_DEATH: {
      icon: (
        <GiWolfTrap className="text-3xl fill-sand-500/60 group-hover:fill-sand-500 transition-colors" />
      ),
      unRestricted: (player: Player, entity: Entity) => {
        const snippets = t.stats.combatLog.unRestricted.pveDeath.split('$');

        return (
          <>
            <span className="text-green-500">{player}</span>
            {snippets[0]}
            <span className="text-red-500">{entity}</span>
            {snippets[1]}
          </>
        );
      },
    },
    NAME_CHANGED: {
      icon: (
        <GiBodySwapping className="text-3xl fill-sand-500/60 group-hover:fill-sand-500 transition-colors" />
      ),
      unRestricted: (player: Player) => {
        return <></>;
      },
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
    <div>
      <div className="group flex gap-5">
        <div className="bg-background-150/80 w-14 aspect-square rounded-full flex items-center justify-center group-hover:bg-background-150 transition-all">
          {EVENTS[event].icon}
        </div>
        <div>
          <span className="text-sm opacity-75 font-light">{timeString}</span>
          <p>
            {EVENTS[event].unRestricted(
              data.player,
              data.reason === EventType.pvp
                ? data.entity
                : data.reason || 'Banane',
              data.sleeper
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
