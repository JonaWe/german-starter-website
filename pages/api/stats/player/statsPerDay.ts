import { NextApiRequest, NextApiResponse } from 'next';

import { STEAM_ID_LENGTH } from '../../../../lib/constatns';
import { prisma } from '../../../../lib/stats/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const steamid = req.query.steamid.toString();

  if (!steamid) return res.status(400).send('no steamid param');

  if (isNaN(parseInt(steamid)) || steamid.length !== STEAM_ID_LENGTH)
    return res.status(400).send('invalid steamid');

  //`SELECT count(*) as kills, time FROM pvplog WHERE killer_steamid = ${steamid} GROUP BY date(time) ORDER BY time ASC`;

  const killsPerDay =
    await prisma.$queryRaw`SELECT count(*) as kills,time as kill_time, (SELECT count(*) as deaths FROM pvplog WHERE target_steamid = ${steamid} AND date(time) = date(kill_time)) as deaths FROM pvplog WHERE killer_steamid = ${steamid} GROUP BY date(kill_time);`;

  if (!killsPerDay) return res.status(500).send('could not get player');

  return res.status(200).json({
    killsPerDay,
  });
}
