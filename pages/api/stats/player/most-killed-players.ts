import { NextApiRequest, NextApiResponse } from 'next';

import { STEAM_ID_LENGTH } from '../../../../lib/constants';
import { prisma } from '../../../../lib/stats/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const steamid = req.query.steamid.toString();

  if (!steamid) return res.status(400).send('no steamid param');

  if (isNaN(parseInt(steamid)) || steamid.length !== STEAM_ID_LENGTH)
    return res.status(400).send('invalid steamid');

  const killedPlayers =
    await prisma.$queryRaw`SELECT COUNT(killer_steamid) AS kills, CONVERT(target_steamid, CHAR(17)) as target_steamid, name FROM pvplog
    JOIN players on target_steamid = players.steamid
    WHERE killer_steamid = ${steamid}
    GROUP BY target_steamid
    ORDER BY kills DESC
    LIMIT 20`;
    
  if (!killedPlayers) return res.status(500).send('could not get player');

  return res.status(200).json(killedPlayers);
}
