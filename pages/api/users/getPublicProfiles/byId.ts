import { NextApiRequest, NextApiResponse } from 'next';

import { UserRecord } from 'firebase-admin/auth';

import { auth, db } from '../../../../firebase/admin/firebaseAdmin';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!req.body.uid && !req.body.email)
    return res.status(400).json({ message: 'no uid param' });

  let user: UserRecord | null = null;

  try {
    if (req.body.uid) user = await auth.getUser(req.body.uid);
    if (req.body.email) user = await auth.getUserByEmail(req.body.email);
  }catch(e){
    return res.status(500).send('user not found');
  }

  const userAttributes = (await db.doc(`users/${req.body.uid}`).get()).data();
  
  res.status(200).json({
    displayName: user?.displayName,
    photoURL: user?.photoURL,
    email: user?.email,
    uid: user?.uid,
    steamid: userAttributes?.settings?.steamid || null
  });
}
