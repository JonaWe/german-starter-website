import { NextApiRequest, NextApiResponse } from 'next';

import { Timestamp } from 'firebase/firestore';

import { db } from '../../../firebase/admin/firebaseAdmin';
import { checkIfSameDay } from '../../../lib/checkIfSameDay';
import { prisma } from '../../../lib/stats/db';

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
  const playerOfTheDay = await getPLayerOfTheDay(res);
  let isCurrent = false;

  //Check if player in firebase is from the current day
  if (playerOfTheDay?.date && checkIfSameDay((playerOfTheDay?.date as Timestamp).toDate()))
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

  if (newPlayerOfTheDay) isCurrent = true;

  /*
  Add new player of the day to firebase
  if there is no new player of the day, renew the last one 
  */
  db.doc('stats/playerOfTheDay').set({
    player: newPlayerOfTheDay
      ? newPlayerOfTheDay.killer_steamid
      : playerOfTheDay?.player,
    kills: newPlayerOfTheDay ? newPlayerOfTheDay.kills : playerOfTheDay?.kills,
    date: new Date(),
  });

  return res
    .status(200)
    .json({ playerOfTheDay: await getPLayerOfTheDay(res), isCurrent });
}
