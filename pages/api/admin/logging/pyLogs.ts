import { NextApiRequest, NextApiResponse } from 'next';

import axios from 'axios';

import { auth, db } from '../../../../firebase/admin/firebaseAdmin';
import { PY_LOG_PATH } from '../../../../lib/constants';
import withAdminAuth from '../../../../lib/firebase/withAdminAuth';
import withAuth from '../../../../lib/firebase/withAuth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await withAuth(req, res, 'owner');
  if (!user) return;

  const DELIMITER = '\n';
  const MAX_LINES = 40;

  const { data } = await axios.get(PY_LOG_PATH);

  const log = data
    .split(DELIMITER)
    .reverse()
    .slice(0, MAX_LINES)
    .join(DELIMITER);

  res.status(200).send(log);
}
