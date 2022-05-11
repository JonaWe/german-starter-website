import { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient } from '@prisma/client';
import { Timestamp } from 'firebase/firestore';

import { db } from '../../../firebase/admin/firebaseAdmin';
import { checkIfSameDay } from '../../../lib/checkIfSameDay';

async function getPLayerOfTheDay(res: NextApiResponse) {
  const playerOfTheDaySnap = await db.doc(`stats/playerOfTheDay`).get();

  if (!playerOfTheDaySnap.exists)
    return res.status(500).send('could not get player of the day');

  return playerOfTheDaySnap.data();
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();
  const playerOfTheDay = await getPLayerOfTheDay(res);

  //Check if player in firebase is from the current day
  if (checkIfSameDay((playerOfTheDay?.date as Timestamp).toDate()))
    return res.status(200).json({ playerOfTheDay: { ...playerOfTheDay } });

  //Get player of the day from db
  //TODO: Convert raw query to efficient prisma query
  const [newPlayerOfTheDay]: { killer_steamid: string; kills: number }[] =
    await prisma.$queryRaw`
      SELECT Count(killer_steamid) AS kills,
          CONVERT(killer_steamid, CHAR(17)) as killer_steamid
      FROM   pvplog
      WHERE  time >= Now() - INTERVAL 1 day
      GROUP  BY killer_steamid
      ORDER  BY kills DESC
      LIMIT  1; 
    `;

    //Add new player of the day to firebase
    db.doc('stats/playerOfTheDay').set({
      player: newPlayerOfTheDay.killer_steamid,
      date: new Date(),
    });

  return res.status(200).json({ playerOfTheDay: await getPLayerOfTheDay(res) });
}