import { NextApiRequest, NextApiResponse } from 'next';

import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //SEND alert to admin chanel discord

  res.status(200).send('ok');
}
