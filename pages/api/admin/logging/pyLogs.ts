import { NextApiRequest, NextApiResponse } from 'next';

import axios from 'axios';

import { auth, db } from '../../../../firebase/admin/firebaseAdmin';
import { PY_LOG_PATH } from '../../../../lib/constants';
import withAdminAuth from '../../../../lib/firebase/withAdminAuth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await withAdminAuth(req, res);
  if (!user) return;

  const DELIMITER = '\n';

  const { data } = await axios.get(PY_LOG_PATH);

  const log = data.split(DELIMITER).reverse().join(DELIMITER);

  res.status(200).send(log);
}