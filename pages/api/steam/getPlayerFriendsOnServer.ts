import { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient } from '@prisma/client';

import { STEAM_APPID_RUST } from '../../../lib/constatns';
import { steam } from '../../../lib/steam/steamClient';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req;
  const { steamid } = body;

  if (!steamid) return res.status(400).json({ message: 'no steamid param' });

  try {
    const friends = await steam.getUserFriends(steamid);

    const friendsIds = friends.map((el) => {
      return BigInt(el.steamID);
    });

    const friendsOnServer = await prisma.players.findMany({
      where: { steamid: { in: friendsIds } },
    });

    res.status(200).json(
      friendsOnServer.map((friend) => {
        return String(friend.steamid);
      })
    );
    
  } catch (err) {
    res.status(500).json((err as Error).message);
  }
}
