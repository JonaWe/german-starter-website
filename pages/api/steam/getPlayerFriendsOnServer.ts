import { NextApiRequest, NextApiResponse } from 'next';

import { players } from '@prisma/client';

import { prisma } from '../../../lib/stats/db';
import { steam } from '../../../lib/steam/steamClient';

export interface Friend extends Omit<players, 'steamid'> {
  steamid: string;
  friendsSince: number;
  friendedAt: Date;
  relationship: string;
}

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
      take: 20,
    });

    res.status(200).json({
      friendsOnServer: friendsOnServer.map((friend) => {
        const steamid = String(friend.steamid);
        const friendAttributes = friends.find((f) => f.steamID === steamid);

        if (!friendAttributes) return;

        return {
          ...friend,
          steamid,
          friendedAt: friendAttributes.friendedAt,
          friendsSince: friendAttributes.friendSince,
          relationship: friendAttributes.relationship.toString(),
        } as Friend;
      }),
    });
  } catch (err) {
    res.status(500).json((err as Error).message);
  }
}
