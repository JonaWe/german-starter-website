import { NextApiRequest, NextApiResponse } from 'next';

import axios from 'axios';

import { db } from '../../../firebase/admin/firebaseAdmin';

//test
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const config = await db.doc('config/server').get();

  const id = config.data()?.discordCode;

  const { data } = await axios.get(
    `https://discord.com/api/v9/invites/${id}?with_counts=true&with_expiration=true`
  );
  return res.status(200).send(data);
}
