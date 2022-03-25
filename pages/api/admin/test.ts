import { NextApiRequest, NextApiResponse } from 'next';

import { getAuth } from 'firebase-admin/auth';
import { FirebaseApp } from 'firebase/app';

import { admin } from '../../../firebase/admin/firebaseAdmin';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const auth = getAuth(admin as FirebaseApp);

  //   auth.
  console.log(auth.getUsers);

  res.status(200).json({ message: 'ok' });
}
