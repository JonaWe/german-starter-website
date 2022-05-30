import { NextApiRequest, NextApiResponse } from 'next';

import { players } from '@prisma/client';

import { STEAM_ID_LENGTH } from '../../../../lib/constants';
import { prisma } from '../../../../lib/stats/db';

interface Nemesis {
  nem_id: string;
  nem_name: string;
  nem_kills: number;
  nem_deaths: number;
}

export interface PlayerStats extends Omit<players, 'steamid'> {
  nemesis: Nemesis;
  steamid: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const steamid = req.query.steamid.toString();

  if (!steamid) return res.status(400).send('no steamid param');

  if (isNaN(parseInt(steamid)) || steamid.length !== STEAM_ID_LENGTH)
    return res.status(400).send('invalid steamid');

  const player = await prisma.players.findUnique({
    where: {
      steamid: BigInt(steamid),
    },
  });

  const nemesis = (await prisma.$queryRaw`
  SELECT COUNT(killer_steamid) nem_deaths,
  CONVERT(killer_steamid, CHAR(17)) nem_id,
  players.name nem_name,
  (
      SELECT COUNT(*)
      FROM pvplog
      WHERE pvplog.killer_steamid = ${steamid}
          AND pvplog.target_steamid = nem_id
  ) AS nem_kills
  FROM pvplog
    JOIN players on players.steamid = pvplog.killer_steamid
  WHERE pvplog.target_steamid = ${steamid}
  GROUP BY nem_id
  ORDER BY nem_deaths DESC
  LIMIT 1
`) as Nemesis[];

  if (!player) return res.status(500).send('could not get player');

  const stats: PlayerStats = {
    ...player,
    steamid: String(player.steamid),
    nemesis: nemesis[0],
  };

  return res.status(200).json({ player: stats });
}
