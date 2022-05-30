import { NextApiRequest, NextApiResponse } from 'next';

import { doc, getDoc } from 'firebase/firestore';
import { queryGameServerPlayer } from 'steam-server-query';

import { db } from '../../../firebase/clientApp';

/**
 * This is not very accurate because its based of of names instead of steamids. This is as far as i now not possible without RCON.
 */

const getOnlinePlayers = async () => {
  const configRef = doc(db, 'config', 'server');
  const configSnap = await getDoc(configRef);
  const config = configSnap.data();

  const data = await queryGameServerPlayer('208.52.152.94:28025', 2, 5000);

  return data;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { body } = req;
    const { players } = body;

    if (!players || !Array.isArray(players))
      return res
        .status(400)
        .send('invalid players param. Must be array of player names');

    const allPlayersOnline = await getOnlinePlayers();

    const onlinePlayers = allPlayersOnline.players.filter((player) =>
      players.includes(player.name)
    );

    res.status(200).json({ onlinePlayers });
  } catch (err) {
    res.status(500).send((err as Error).message);
  }
}
