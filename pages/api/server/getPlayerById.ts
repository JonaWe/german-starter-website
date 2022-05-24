import { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient } from '@prisma/client';

import { prisma } from '../../../lib/stats/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req;
  const { steamId } = body;

  if (!steamId) return res.status(400).json({ message: 'no id param' });

  try {
    const player =
      await prisma.$queryRaw`SELECT name, CONVERT(steamid, CHAR(17)) as steamid FROM players WHERE steamid = ${steamId}`;
    res.status(200).json({ player });
  } catch (err) {
    console.log(err);

    res.status(400).json({ error: err });
  }
}
