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

    const friendIds = friends.map((el) => {
      return BigInt(el.steamID);
    });

    const friendsOnServer = await prisma.players.findMany({
      where: { steamid: { in: friendIds } },
    });

    res.status(200).json(
      friendsOnServer.map((friend) => {
        const steamid = String(friend.steamid);
        const friendAttributes = friends.find((f) => f.steamID === steamid);

        if (!friendAttributes) return;

        return {
          ...friend,
          steamid,
          friendedAt: friendAttributes.friendedAt,
          friendsSince: friendAttributes.friendSince,
          relationship: friendAttributes.relationship,
        };
      })
    );
  } catch (err) {
    res.status(500).json((err as Error).message);
  }
}
