import { NextApiRequest, NextApiResponse } from 'next';

import { auth } from '../../../firebase/admin/firebaseAdmin';
import withAdminAuth from '../../../lib/firebase/withAdminAuth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await withAdminAuth(req, res);
  if (!user) return;

  const users = await auth.listUsers();

  res.status(200).json(users);
}
