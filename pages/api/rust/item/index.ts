import { NextApiRequest, NextApiResponse } from 'next';

import axios from 'axios';

import { FACEPUNCH_URLS } from '../../../../lib/constants';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id?.toString();

  if (!id) return res.status(400).send('no id param');

  const { data } = await axios.get(
    `${FACEPUNCH_URLS.RUST_ITEMS_WIKI_URL}/${id}?format=json`
  );

  return res.status(200).json({
    data:
      data.updateCount > 0
        ? {
            title: data.title,
            description: data.markup.match(
              /(?<=<description>).+?(?=<\/description>)/
            )?.[0],
          }
        : null,
  });
}
