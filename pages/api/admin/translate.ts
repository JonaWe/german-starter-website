import { NextApiRequest, NextApiResponse } from 'next';

import axios from 'axios';

import withAuth from '../../../lib/firebase/withAuth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await withAuth(req, res, 'owner');
  if (!user) return;

  const { body } = req;
  const { text } = body;

  if (!text) return res.status(400).json({ message: 'no text param' });

  try {
    const translationRes = await axios.post(
      'https://libretranslate.de/translate',
      {
        q: text,
        source: body.source || 'de',
        target: body.target || 'en',
        format: 'text',
      }
    );
    const { translatedText } = translationRes.data;
    res.status(200).json({ text: translatedText });
  } catch (err) {
    res.status(200).json({ text: '', message: (err as Error).message });
  }
}
