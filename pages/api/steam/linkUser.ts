import { NextApiRequest, NextApiResponse } from 'next';

import { withIronSessionApiRoute } from 'iron-session/next';

import { db } from '../../../firebase/admin/firebaseAdmin';
import withUser from '../../../lib/firebase/withUser';
import { options } from '../../../lib/sessionOptions';

export default withIronSessionApiRoute(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await withUser(req, res);
  if (!user) return;

  if (!req.session.steamUser)
    return res.status(400).json({ error: 'no steam user in session' });

  const userDoc = await db
    .doc(`users/${user.uid}`)
    .set({ steamid: req.session.steamUser.steamid }, { merge: true });

  res.status(200).json({ userDoc });
},
options);
