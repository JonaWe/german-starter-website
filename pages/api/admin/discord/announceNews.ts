import { NextApiRequest, NextApiResponse } from 'next';

import { MessageBuilder, Webhook } from 'discord-webhook-node';

import constants from '../../../../lib/constatns';
import CONSTANTS from '../../../../lib/constatns';
import withAdminAuth from '../../../../lib/firebase/withAdminAuth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = await withAdminAuth(req, res);
  if (!user) return;

  const { author, titleDe, titleEn, id } = req.body;

  const HOOK_URL = process.env.DISCORD_WEBHOOK_URL;

  if (!HOOK_URL)
    return res.status(500).send('No webhook configured on server url');

  const hook = new Webhook(HOOK_URL);

  const embed = new MessageBuilder()
    .setTitle(titleDe + ' | ' + titleEn)
    .setAuthor("Germen Starter News", "https://i.pinimg.com/originals/cc/40/6a/cc406a8382d8df7eb5f395ec884d3c95.png", CONSTANTS.DOMAIN)
    .setColor(parseInt('CD412B', 16))

    .setDescription(
      `
      @everyone

      **[DE]**
      Wir haben gerade einen neuen Artikel veröffentlicht! [Mehr lesen](${CONSTANTS.DOMAIN}/de/news/${id})
      
      **[EN]**
      We have just released a new article! [Read more](${CONSTANTS.DOMAIN}/en/news/${id})
      `
    )
    // .setImage('https://cdn.discordapp.com/embed/avatars/0.png')
    .setFooter(author.name, author.photoURL)
    .setTimestamp();

  hook.send(embed);

  res.status(200).json({});
}
