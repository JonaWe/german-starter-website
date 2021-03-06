import { NextApiRequest, NextApiResponse } from 'next';

import { queryGameServerPlayer } from 'steam-server-query';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req;
  const { ip } = body;

  if (!ip) return res.status(404).json({ message: 'no ip param' });

  try {
    const info = await queryGameServerPlayer(ip);
    res.status(200).json({ playerCount: info.playerCount });
  } catch {
    res.status(503).json({});
  }
}
