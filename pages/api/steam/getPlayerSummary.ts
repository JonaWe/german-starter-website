import { NextApiRequest, NextApiResponse } from 'next';

import { steam } from '../../../lib/steam/steamClient';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req;
  const { id } = body;

  if (!id) return res.status(400).json({ message: 'no steamid param' });

  const summary = await steam.getUserSummary(id);

  res.status(200).json({ summary });
}
