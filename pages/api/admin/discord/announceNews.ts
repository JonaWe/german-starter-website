import { NextApiRequest, NextApiResponse } from 'next';

import { MessageBuilder, Webhook } from 'discord-webhook-node';

import withAdminAuth from '../../../../lib/firebase/withAdminAuth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await withAdminAuth(req, res);
  if (!user) return;

  const HOOK_URL = process.env.DISCORD_WEBHOOK_URL;

  if (!HOOK_URL)
    return res.status(500).send('No webhook configured on server url');

  const hook = new Webhook(HOOK_URL);

  const embed = new MessageBuilder()
    .setTitle('My title here')
    .setAuthor(
      'Author here',
      'https://cdn.discordapp.com/embed/avatars/0.png',
      'https://www.google.com'
    )

    .addField('First field', 'this is inline', true)
    .addField('Second field', 'this is not inline')
    .setColor(parseInt('#00b0f4', 16))
    .setThumbnail('https://cdn.discordapp.com/embed/avatars/0.png')
    .setDescription('Oh look a description :)')
    .setImage('https://cdn.discordapp.com/embed/avatars/0.png')
    .setFooter(
      'Hey its a footer',
      'https://cdn.discordapp.com/embed/avatars/0.png'
    )
    .setTimestamp();

  hook.send(embed);

  res.status(200).json({});
}
