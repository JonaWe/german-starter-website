import { NextApiRequest, NextApiResponse } from 'next';

import { STEAM_ID_LENGTH } from '../../../../lib/constants';
import withAdminAuth from '../../../../lib/firebase/withAdminAuth';
import { prisma } from '../../../../lib/stats/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const steamid = req.query.steamid?.toString();
  const restrict = req.query.restrict?.toString() === 'true';
  const offset = req.query.offset?.toString();
  const limit = req.query.limit?.toString();

  let log: unknown[] = [];

  if (!steamid) return res.status(400).send('no steamid param');

  if (isNaN(parseInt(steamid)) || steamid.length !== STEAM_ID_LENGTH)
    return res.status(400).send('invalid steamid');

  if (!restrict) {
    const user = await withAdminAuth(req, res);
    if (!user) return;
    log = await prisma.$queryRaw`
    SELECT  CONVERT(KILLER_STEAMID, Char(17)) AS killer_steamid,
            CONVERT(TARGET_STEAMID, Char(17)) AS target_steamid,
            time,
            sleeper,
            "pvp_event" AS reason
    FROM   pvplog
    WHERE  killer_steamid = ${steamid}
    OR     target_steamid = ${steamid}
    UNION
    SELECT   NULL    AS killer_steamid,
        steamid AS target_steamid,
        time,
        0 AS sleeper,
        reason
    FROM     pvelog
    WHERE    steamid = ${steamid}
    ORDER BY time DESC limit ${limit || 30} offset ${offset || 0};`;
  } else {
    //Only select own steam id dont select others, instead null
    log = await prisma.$queryRaw`
    SELECT
       CASE
              WHEN killer_steamid = ${steamid} THEN CONVERT(killer_steamid, char(17))
              ELSE NULL
       END AS killer_steamid,
       CASE
              WHEN target_steamid = ${steamid} THEN CONVERT(target_steamid, char(17))
              ELSE NULL
       END AS target_steamid,
       time,
       sleeper,
       "pvp_event" AS reason
    FROM   pvplog
    WHERE  killer_steamid = ${steamid}
    OR     target_steamid = ${steamid}
    UNION
    SELECT   NULL    AS killer_steamid,
            steamid AS target_steamid,
            time,
            0 AS sleeper,
            reason
    FROM     pvelog
    WHERE    steamid = ${steamid}
    ORDER BY time DESC limit ${limit || 30} offset ${offset || 0};`;
  }

  if (!log) return res.status(500).send('could not get player');

  return res.status(200).json({
    restricted: restrict,
    steamid,
    log,
  });
}
