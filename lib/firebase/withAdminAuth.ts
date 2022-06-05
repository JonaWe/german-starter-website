import { NextApiRequest, NextApiResponse } from 'next';

import { DecodedIdToken } from 'firebase-admin/auth';

import { auth } from '../../firebase/admin/firebaseAdmin';

export default async function withAdminAuth(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let user: DecodedIdToken;
  const authorization = req.headers.authorization;

  if (!authorization) return res.status(401).json('No Auth provided');

  const [bearer, token] = authorization.split(' ');

  if (!token) return res.status(401).json('No Token provided');

  try {
    user = await auth.verifyIdToken(token);
  } catch {
    return res.status(401).json('unable to decode token');
  }

  if (!user) return res.status(401).json('Invalid Token');

  if (user.admin) return user;

  return res.status(403).json('forbidden');
}
