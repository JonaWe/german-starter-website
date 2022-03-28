import { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req;
  const { name } = body;

  if (!name) return res.status(404).json({ message: 'no id param' });

  const players = await prisma.$queryRaw`
  SELECT * FROM (
    SELECT name, MATCH (name) AGAINST (${name}) AS relevance FROM players ORDER BY relevance  DESC LIMIT 10
  ) as x 
  WHERE relevance > 0 `;

  res.status(200).json({ players });
}
