import { NextApiRequest, NextApiResponse } from 'next';

import { withIronSessionApiRoute } from 'iron-session/next';

import { auth, db } from '../../../firebase/admin/firebaseAdmin';
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

  await db.doc(`users/${user.uid}`).set(
    {
      settings: {
        steamid: req.session.steamUser.steamid,
      },
    },
    { merge: true }
  );

  const newUser = await auth.updateUser(user.uid, {
    displayName: req.session.steamUser.username,
    photoURL: req.session.steamUser.avatar.medium,
  });

  req.session.destroy();

  res.status(200).json({ newUser });
},
options);
