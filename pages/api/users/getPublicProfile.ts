import { NextApiRequest, NextApiResponse } from 'next';

import { queryGameServerInfo } from 'steam-server-query';

import { auth } from '../../../firebase/admin/firebaseAdmin';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req;
  const { uid } = body;

  if (!uid) return res.status(400).json({ message: 'no uid param' });

  const user = await auth.getUser(uid);

  res.status(200).json({
    displayName: user.displayName,
    photoURL: user.photoURL,
  });
}
