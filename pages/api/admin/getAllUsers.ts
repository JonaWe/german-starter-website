import { NextApiRequest, NextApiResponse } from 'next';

import { auth } from '../../../firebase/admin/firebaseAdmin';
import withAuth from '../../../lib/firebase/withAuth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await withAuth(req, res, 'owner');
  if (!user) return;

  const users = await auth.listUsers();

  res.status(200).json(users);
}
