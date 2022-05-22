import { NextApiRequest, NextApiResponse } from 'next';

import { STEAM_APPID_RUST } from '../../../lib/constatns';
import { steam } from '../../../lib/steam/steamClient';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req;
  const { steamid } = body;

  if (!steamid) return res.status(400).json({ message: 'no steamid param' });

  try {
    const info = await steam.getUserOwnedGames(steamid);

    const [rust] = info.filter(
      (game) => game.appID === parseInt(STEAM_APPID_RUST)
    );

    res.status(200).json(rust);
  } catch (err) {
    res.status(500).json((err as Error).message);
  }
}
