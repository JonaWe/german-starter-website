import { NextSeo } from 'next-seo';
import { PlayerSummary } from 'steamapi';

export default function PlayerPageSEO({
  player,
  locale,
}: {
  player: PlayerSummary;
  locale: string;
}) {
  const ogParams = {
    name: player.nickname,
    steamid: player.steamID,
    avatar: player.avatar.large,
    local: locale || 'de',
  };

  const ogBaseUrl = 'https://og.noekrebs.ch/api/rust?';

  const ogUrlParams = new URLSearchParams(ogParams).toString();

  const ogLinkTags = [
    {
      rel: 'icon',
      href: player.avatar.small,
    },
  ];

  return (
    <NextSeo
      additionalLinkTags={ogLinkTags}
      title={`${player.nickname} - German Starter Server`}
      openGraph={{
        url: 'https://www.german-starter.de',
        title: `${player.nickname} - German Starter Server`,
        description: 'German Starter Server',
        site_name: 'German Starter Server',
        images: [
          {
            url: ogBaseUrl + ogUrlParams,
            width: 1200,
            height: 630,
            alt: 'German Starter Banner',
            type: 'image/png',
          },
        ],
      }}
    />
  );
}
