import { NextApiRequest, NextApiResponse } from 'next';

import { auth } from '../../../firebase/admin/firebaseAdmin';
import withAdminAuth from '../../../lib/firebase/withAdminAuth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await withAdminAuth(req, res);
  if (!user) return;

  if (!req.body.uid)
    return res.status(400).json({ error: 'no user id provided' });

  const { uid } = req.body;

  const userToChange = await auth.getUser(uid);

  if (!userToChange) return res.status(400).send({ error: 'invalid uid' });

  auth.setCustomUserClaims(uid, { admin: false });

  res.status(200).json({});
}
