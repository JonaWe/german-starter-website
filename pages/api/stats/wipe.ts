import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '../../../lib/stats/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req;
  const { skip, take } = body;

  const MAX_TAKE = 1000;

  if (take > MAX_TAKE)
    return res.status(400).send(`"take" to large. MAX: ${MAX_TAKE}`);

  const stats = await prisma.player_wipe_stats.findMany({
    skip: skip || 0,
    take: take || 100,
  });

  //TODO: Cleanup this code
  const data = JSON.parse(
    JSON.stringify(stats, (key, value) =>
      typeof value === 'bigint' ? value.toString() : value
    )
  );

  res.status(200).json({
    skip: skip || 0,
    take: take || 100,
    data,
  });
}
