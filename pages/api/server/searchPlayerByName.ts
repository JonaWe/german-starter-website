import { NextApiRequest, NextApiResponse } from 'next';

import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let query;
  const { body } = req;
  const { name } = body;

  if (!name) return res.status(400).json({ message: 'no id param' });

  query = Prisma.sql`SELECT * FROM (
      SELECT name, CONVERT(steamid, CHAR(17)) AS steamid, MATCH (name) AGAINST (${name}) AS relevance FROM players ORDER BY relevance  DESC LIMIT 10
  ) as x 
  WHERE relevance > 0 `;

  const players = await prisma.$queryRaw`${query}`;

  res.status(200).json({ players });
}
