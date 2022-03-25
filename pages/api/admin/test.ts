import { NextApiRequest, NextApiResponse } from 'next';
import withAdminAuth from '../../../lib/firebase/withAdminAuth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authorized = await withAdminAuth(req, res);
  if (!authorized) return;

  res.status(200).json({ admin: 'user.admin' });
}
