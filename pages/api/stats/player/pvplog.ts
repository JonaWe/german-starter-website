import { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient } from '@prisma/client';

import { STEAM_ID_LENGTH } from '../../../../lib/constatns';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();
  const steamid = req.query.steamid.toString();

  if (!steamid) return res.status(400).send('no steamid param');

  if (isNaN(parseInt(steamid)) || steamid.length !== STEAM_ID_LENGTH)
    return res.status(400).send('invalid steamid');

  const pvplog = {};

  if (!pvplog) return res.status(500).send('could not get player');

  return res.status(200).json({
    pvplog,
  });
}
