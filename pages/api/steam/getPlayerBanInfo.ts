import { NextApiRequest, NextApiResponse } from 'next';

import { steam } from '../../../lib/steam/steamClient';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req;
  const { steamid } = body;

  if (!steamid) return res.status(400).json({ message: 'no steamid param' });

  try {
    const info = await steam.getUserBans(steamid);
    res.status(200).json(info);
  } catch (err) {
    res.status(500).json((err as Error).message);
  }
}
