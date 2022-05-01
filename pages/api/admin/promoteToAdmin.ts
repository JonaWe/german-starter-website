import { NextApiRequest, NextApiResponse } from 'next';

import { UserRecord } from 'firebase-admin/auth';

import { auth, db } from '../../../firebase/admin/firebaseAdmin';
import withAdminAuth from '../../../lib/firebase/withAdminAuth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await withAdminAuth(req, res);
  if (!user) return;

  if (!req.body.uid && !req.body.email)
    return res.status(400).json({ error: 'no user id or email provided' });

  let userToChange: UserRecord;

  if (req.body.email) {
    const { email } = req.body;
    userToChange = await auth.getUserByEmail(email);
  } else {
    const { uid } = req.body;
    userToChange = await auth.getUser(uid);
  }

  if (!userToChange) return res.status(400).send({ error: 'invalid uid' });

  db.doc(`users/${userToChange.uid}`).set({ role: 'admin' }, { merge: true });

  auth.setCustomUserClaims(userToChange.uid, { admin: true });

  res.status(200).json({});
}
