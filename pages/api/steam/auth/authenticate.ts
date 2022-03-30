import { NextApiRequest, NextApiResponse } from 'next';

import steamAuth from '../../../../lib/steam/steamAuth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const user = await steamAuth.authenticate(req);

    console.log(user);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error });
  }
}
