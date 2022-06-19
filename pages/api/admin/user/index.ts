import { NextApiRequest, NextApiResponse } from 'next';

import { auth } from '../../../../firebase/admin/firebaseAdmin';
import withAdminAuth from '../../../../lib/firebase/withAdminAuth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await withAdminAuth(req, res);
  if (!user) return;

  const uid = String(req.query.uid);

  const requestedUser = await auth.getUser(uid);

  res.status(200).json(requestedUser);
}
