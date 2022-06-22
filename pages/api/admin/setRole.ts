import { NextApiRequest, NextApiResponse } from 'next';

import { UserRecord } from 'firebase-admin/auth';

import { ACCESS_ROLES, RoleId, isOfTypeRole } from '../../../data/AccessRoles';
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

  if (
    ACCESS_ROLES[(user.role as RoleId) || 'user'].accessLevel <
    ACCESS_ROLES[role as RoleId].accessLevel
  )
    return res
      .status(403)
      .send('cant not change user to higher level then yourself');

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
