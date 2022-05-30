import { NextApiRequest, NextApiResponse } from 'next';

import { doc, getDoc } from 'firebase/firestore';
import { queryGameServerPlayer } from 'steam-server-query';

import { db } from '../../../../firebase/clientApp';
import { STEAM_APPID_RUST } from '../../../../lib/constants';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const configRef = doc(db, 'config', 'server');
    const configSnap = await getDoc(configRef);
    const config = configSnap.data();

    const data = await queryGameServerPlayer(config?.ip);
    res.status(200).json({ data });
  } catch (err) {
    res.status(500).send((err as Error).message);
  }
}
