import { getAuth } from 'firebase-admin/auth';
import { FirebaseApp } from 'firebase/app';
import { NextApiRequest, NextApiResponse } from 'next';
import { admin } from '../../firebase/admin/firebaseAdmin';

export default async function withAdminAuth(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const auth = getAuth(admin as FirebaseApp);

  const authorization = req.headers.authorization;

  if (!authorization) return res.status(401).json('No Auth provided');

  const [bearer, token] = authorization.split(' ');

  if (!token) return res.status(401).json('No Token provided');

  const user = await auth.verifyIdToken(token);

  if (!user) return res.status(401).json('Invalid Token');

  if (user.admin) return user;

  return res.status(403).json('forbidden');
}
