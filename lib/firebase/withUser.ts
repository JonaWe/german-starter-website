import { NextApiRequest, NextApiResponse } from 'next';

import { auth } from '../../firebase/admin/firebaseAdmin';

export default async function withUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authorization = req.headers.authorization;

  if (!authorization) return res.status(401).json('No Auth provided');

  const [bearer, token] = authorization.split(' ');

  if (!token) return res.status(401).json('No Token provided');

  const user = await auth.verifyIdToken(token);

  if (user) return user;
  else return res.status(401).json('Invalid Token');
}
