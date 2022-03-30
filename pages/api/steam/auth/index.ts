import { NextApiRequest, NextApiResponse } from 'next';

import steamAuth from '../../../../lib/steam/steamAuth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const redirectUrl = await steamAuth.getRedirectUrl();
  return res.redirect(redirectUrl);
}
