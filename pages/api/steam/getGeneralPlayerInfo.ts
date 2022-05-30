import { NextApiRequest, NextApiResponse } from 'next';

import { PlayerSummary } from 'steamapi';

import { STEAM_APPID_RUST } from '../../../lib/constants';
import { steam } from '../../../lib/steam/steamClient';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req;
  const { steamid } = body;

  if (!steamid) return res.status(400).json({ message: 'no steamid param' });

  try {
    const summary = (await steam.getUserSummary(
      steamid
    )) as unknown as PlayerSummary;

    const banInfo = await steam.getUserBans(steamid);

    if (summary.visibilityState === 1)
      return res.status(200).json({
        banInfo,
        summary,
      });

    const info = await steam.getUserOwnedGames(steamid);

    const [rust] = info.filter(
      (game) => game.appID === parseInt(STEAM_APPID_RUST)
    );

    res.status(200).json({
      banInfo,
      summary,
      rust: {
        playtimeForever: rust.playTime,
        playtime2Weeks: rust.playTime2,
      },
    });
  } catch (err) {
    res.status(500).json((err as Error).message);
  }
}
