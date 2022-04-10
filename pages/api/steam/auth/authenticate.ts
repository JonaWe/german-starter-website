import { NextApiRequest, NextApiResponse } from 'next';

import { withIronSessionApiRoute } from 'iron-session/next';

import { options } from '../../../../lib/sessionOptions';
import steamAuth from '../../../../lib/steam/steamAuth';

export default withIronSessionApiRoute(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const user = await steamAuth.authenticate(req);

    req.session.steamUser = {
      steamid: user.steamid,
      username: user.username,
      avatar: user.avatar,
    };
    await req.session.save();

    res.redirect('/user/link-steam-account');
  } catch (error) {
    console.log(error);
    res.redirect('/api/steam/auth');
  }
},
options);
