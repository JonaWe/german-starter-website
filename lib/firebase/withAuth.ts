import { NextApiRequest, NextApiResponse } from 'next';

import { DecodedIdToken } from 'firebase-admin/auth';

import { ACCESS_ROLES, RoleId } from '../../data/AccessRoles';
import { auth } from '../../firebase/admin/firebaseAdmin';
import isAllowedRole from './isAllowedRole';

export default async function withAuth(
  req: NextApiRequest,
  res: NextApiResponse,
  accessRole: RoleId
) {
  let user: DecodedIdToken;
  const authorization = req.headers.authorization;

  if (!authorization) return res.status(401).send('No Auth provided');

  const [bearer, token] = authorization.split(' ');

  if (!token) return res.status(401).send('No Token provided');

  try {
    user = await auth.verifyIdToken(token);
  } catch {
    return res.status(401).send('Unable to decode token');
  }

  if (!user) return res.status(401).send('Invalid token');

  if (isAllowedRole(user.role as RoleId, accessRole)) return user;

  return res.status(403).json('forbidden');
}
