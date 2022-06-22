import { NextApiRequest, NextApiResponse } from 'next';

import { UserRecord } from 'firebase-admin/auth';

import { isOfTypeRole } from '../../../data/AccessRoles';
import { auth, db } from '../../../firebase/admin/firebaseAdmin';
import withAdminAuth from '../../../lib/firebase/withAdminAuth';
import withAuth from '../../../lib/firebase/withAuth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await withAuth(req, res, 'owner');
  if (!user) return;

  if (!req.body.uid && !req.body.role)
    return res.status(400).json({ error: 'no user id provided' });

  const { uid, role } = req.body;

  if (!isOfTypeRole(role))
    return res.status(400).json({ error: 'invalid role' });

  const userToChange = await auth.getUser(uid);

  if (!userToChange) return res.status(400).send({ error: 'invalid uid' });

  try {
    await auth.setCustomUserClaims(userToChange.uid, {
      role: role,
    });

    db.doc(`users/${userToChange.uid}`).set({ role }, { merge: true });
    console.log(userToChange.uid);

    return res.status(200).send('success');
  } catch (err) {
    return res.status(500).send('failed to set property');
  }
}
