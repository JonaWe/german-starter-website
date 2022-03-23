import { NextApiRequest, NextApiResponse } from 'next';
import { queryGameServerRules } from 'steam-server-query';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body } = req;
  const { ip } = body;

  if (!ip) return res.status(404).json({ message: 'no ip param' });

  const rules = await queryGameServerRules(ip);
  res.status(200).json({ rules });
}
