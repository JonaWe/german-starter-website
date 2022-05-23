import { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient } from '@prisma/client';

interface IDictionary<TValue> {
  [id: string]: TValue;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req;
  const {
    skip,
    take,
    query,
    orderBy,
  }: {
    skip: number;
    take: number;
    query: string;
    orderBy: { desc: boolean; id: string }[];
  } = body;

  let orderOptions: any = [];

  const prisma = new PrismaClient();
  const MAX_TAKE = 1000;

  if (take > MAX_TAKE)
    return res.status(400).send(`"take" to large. MAX: ${MAX_TAKE}`);

  //COnvert format of orderBy from react-table format to prisma format
  if (orderBy)
    orderBy.forEach(({ id, desc }) => {
      let entry: { [key: string]: string } = {};
      entry[id] = desc ? 'desc' : 'asc';
      orderOptions.push(entry);
    });

  const stats = await prisma.players.findMany({
    skip: skip || 0,
    take: take || 100,
    orderBy: orderOptions,
    where: {
      name: { search: query && query.length > 0 ? query : undefined },
    },
  });

  const count = await prisma.players.count({
    where: {
      name: { search: query && query.length > 0 ? query : undefined },
    },
  });

  //TODO: Cleanup this code
  const data = JSON.parse(
    JSON.stringify(stats, (key, value) =>
      typeof value === 'bigint' ? value.toString() : value
    )
  );

  await prisma.$disconnect();

  res.status(200).json({
    skip: skip || 0,
    take: take || 100,
    count,
    data,
  });
}
