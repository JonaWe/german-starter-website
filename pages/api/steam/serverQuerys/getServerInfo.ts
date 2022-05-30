import { NextApiRequest, NextApiResponse } from 'next';

import { doc, getDoc } from 'firebase/firestore';
import { queryGameServerInfo } from 'steam-server-query';

import { db } from '../../../../firebase/clientApp';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const configRef = doc(db, 'config', 'server');
    const configSnap = await getDoc(configRef);
    const config = configSnap.data();

    const data = await queryGameServerInfo(config?.ip);

    res.status(200).json({
      data: {
        ...data,
        gameId: String(data.gameId),
        keywords: data.keywords?.split(','),
      },
    });
    
  } catch (err) {
    res.status(500).send((err as Error).message);
  }
}
