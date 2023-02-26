import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '../../../../lib/stats/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const targetId = req.body.targetId.toString();
  const killerId = req.body.killerId.toString();

  if (!targetId || !killerId) return res.status(400).send('no steamid param');

  if (isNaN(parseInt(targetId)) || isNaN(parseInt(killerId)))
    return res.status(400).send('invalid steamid');

  const kills: [{ kills: number }] =
    await prisma.$queryRaw`SELECT count(killer_steamid) as kills FROM pvplog WHERE killer_steamid = ${killerId} AND target_steamid = ${targetId};`;

  const deaths: [{ deaths: number }] =
    await prisma.$queryRaw`SELECT count(killer_steamid) as deaths FROM pvplog WHERE killer_steamid = ${targetId} AND target_steamid = ${killerId};`;

  if (!deaths || !kills) return res.status(500).send('could not get player');

  return res.status(200).json({
    kills: kills[0].kills,
    deaths: deaths[0].deaths,
  });
}
