import { NextApiRequest, NextApiResponse } from 'next';

import axios from 'axios';

import { STEAM_ID_LENGTH } from '../../../lib/constants';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const steamid = req.query.steamid?.toString();

  if (!steamid) return res.status(400).send('no steamid param');

  if (isNaN(parseInt(steamid)) || steamid.length !== STEAM_ID_LENGTH)
    return res.status(400).send('invalid steamid');

  const { data } = await axios.post(
    'https://playerstats.german-starter.de:5000/',
    {
      api_key: process.env.GS_SERVER_WEB_API_KEY,
    }
  );

  return res.status(200).json({data});
}
