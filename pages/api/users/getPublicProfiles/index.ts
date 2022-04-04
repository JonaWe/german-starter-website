import { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '../../../../firebase/admin/firebaseAdmin';

interface PublicUser{
    displayName: string | undefined;
    photoURL: string | undefined;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req;
  const { uids } = body;

  if (!Array.isArray(uids))
    return res.status(400).json({ message: 'no uid param' });

  let users:PublicUser[] = [];

  for (const uid of uids) {
    const user = await auth.getUser(uid);
    users.push({
      displayName: user.displayName,
      photoURL: user.photoURL,
    });
  }

  res.status(200).json({ users });
}
