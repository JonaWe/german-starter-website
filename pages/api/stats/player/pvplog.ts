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

  const pvplog =
    await prisma.$queryRaw`SELECT * FROM pvplog WHERE killer_steamid = ${steamid}`;

  if (!pvplog) return res.status(500).send('could not get player');

  return res.status(200).json({
    pvplog,
  });
}
