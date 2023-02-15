import { NextApiRequest, NextApiResponse } from 'next';

import { STEAM_ID_LENGTH } from '../../../../lib/constants';
import { prisma } from '../../../../lib/stats/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const steamid = req.query.steamid.toString();
  const daysAgo = req.query.after.toString();

  if (!steamid) return res.status(400).send('no steamid param');

  if (isNaN(parseInt(steamid)) || steamid.length !== STEAM_ID_LENGTH)
    return res.status(400).send('invalid steamid');

  const avg = (await prisma.$queryRaw`
    WITH data_differences AS (
        SELECT 
          UNIX_TIMESTAMP(time) - UNIX_TIMESTAMP(LAG(time) OVER (ORDER BY time)) AS time_difference
        FROM 
          pvplog where killer_steamid = ${steamid} ${
    daysAgo ? `and time >= DATE_ADD(NOW(), INTERVAL -${daysAgo} DAY)` : ''
  }
    )
    SELECT AVG(time_difference) AS average_time, sum(time_difference) as time_between_last_and_first
    FROM data_differences;`) as {
    average_time: number;
    time_between_last_and_first: number;
  };

  if (!avg) return res.status(500).send('could not get player');

  return res.status(200).json({
    avgTimeBetween: avg.average_time,
    timeBetweenLastAndFirst: avg.time_between_last_and_first,
  });
}
