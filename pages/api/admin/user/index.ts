import { NextApiRequest, NextApiResponse } from 'next';

import { auth } from '../../../../firebase/admin/firebaseAdmin';
import withAdminAuth from '../../../../lib/firebase/withAdminAuth';
import withAuth from '../../../../lib/firebase/withAuth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await withAuth(req, res, 'owner');
  if (!user) return;

  const uid = String(req.query.uid);

  const requestedUser = await auth.getUser(uid);

  res.status(200).json(requestedUser);
}
