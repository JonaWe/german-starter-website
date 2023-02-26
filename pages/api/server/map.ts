import { NextApiRequest, NextApiResponse } from 'next';

import axios from 'axios';
import { isSameDay } from 'date-fns';
import { Timestamp } from 'firebase-admin/firestore';
import { queryGameServerRules } from 'steam-server-query';

import { db } from '../../../firebase/admin/firebaseAdmin';
import { SERVER_GAME_PORT, SERVER_IP } from '../../../lib/constants';

const SEED_ID = 'world.seed';
const SIZE_ID = 'world.size';

async function getCachedMapInfo(res: NextApiResponse) {
  const infoSnap = await db.doc(`config/map`).get();

  if (!infoSnap.exists)
    return res.status(500).send('could not get player of the day');

  return infoSnap.data();
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const configSnap = await db.doc('config/server').get();

  if (!configSnap.exists)
    return res.status(500).send('could not get server config');

  //Get current cached map from firebase
  const cachedMap = await getCachedMapInfo(res);

  if (isSameDay((cachedMap?.updatedAt as Timestamp).toDate(), new Date()))
    return res.status(200).json(cachedMap);

  const config = configSnap.data();

  const rules = await queryGameServerRules(SERVER_IP + ':' + SERVER_GAME_PORT);

  const seed = rules.rules.find((rule) => rule.name === SEED_ID)?.value;
  const size = rules.rules.find((rule) => rule.name === SIZE_ID)?.value;

  const { data: mapInfo } = await axios.get(
    `https://rustmaps.com/api/v3/maps/${seed}/${size}`,
    {
      headers: {
        'x-api-key': process.env.RUSTMAPS_API_KEY || '',
      },
    }
  );

  const reducedMapInfo = {
    link: mapInfo.url,
    imageLabeled: mapInfo.imageIconUrl,
    imageUnlabeled: mapInfo.imageUrl,
    size: mapInfo.size,
    seed: mapInfo.seed,
    snowBiome: mapInfo.snowBiome,
    desertBiome: mapInfo.desertBiome,
    forestBiome: mapInfo.forestBiome,
    tundraBiome: mapInfo.tundraBiome,
    updatedAt: new Date(),
  };

  db.doc('config/map').set(reducedMapInfo);

  res.status(200).json({ mapInfo: await getCachedMapInfo(res) });
}
