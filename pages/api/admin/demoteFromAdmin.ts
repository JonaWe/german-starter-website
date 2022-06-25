import { NextApiRequest, NextApiResponse } from 'next';

import { auth, db } from '../../../firebase/admin/firebaseAdmin';
import withAdminAuth from '../../../lib/firebase/withAdminAuth';
import withAuth from '../../../lib/firebase/withAuth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await withAuth(req, res, 'owner');
  if (!user) return;

  if (!req.body.uid)
    return res.status(400).json({ error: 'no user id provided' });

  const { uid } = req.body;

  const userToChange = await auth.getUser(uid);

  if (!userToChange) return res.status(400).send({ error: 'invalid uid' });

  db.doc(`users/${userToChange.uid}`).set({ role: 'user' }, { merge: true });

  auth.setCustomUserClaims(uid, { admin: false });

  res.status(200).json({});
}
