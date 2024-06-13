import Link from 'next/link';

import {
  FaDiscord,
  FaGithub,
  FaInstagram,
  FaSteam,
  FaTiktok,
  FaTwitch,
  FaYoutube,
} from 'react-icons/fa';

import useServerConfig from '../../hooks/useServerConfig';
import NavItems from '../Navbar/NavItems';
import PageContent from '../PageContent';

export default function Footer() {
  const [config, setConfig] = useServerConfig();

  const defaultDiscordUrl = 'https://discord.gg/rWqddpwHqF';

  const SOCIAL_LINKS = [
    {
      name: 'Discord',
      icon: (
        <FaDiscord className="text-xl fill-sand-500/60 hover:fill-sand-500 hover:scale-105 hover:cursor-pointer transition-all" />
      ),
      link: config?.discordUrl || defaultDiscordUrl,
    },
    {
      name: 'Github',
      icon: (
        <FaGithub className="text-xl fill-sand-500/60 hover:fill-sand-500 hover:scale-105 hover:cursor-pointer transition-all" />
      ),
      link: 'https://github.com/JonaWe/german-starter-website',
    },
    {
      name: 'Steam',
      icon: (
        <FaSteam className="text-xl fill-sand-500/60 hover:fill-sand-500 hover:scale-105 hover:cursor-pointer transition-all" />
      ),
      link: 'https://steamcommunity.com/groups/BHDRML',
    },
    {
      name: 'Instagram',
      icon: (
        <FaInstagram className="text-xl fill-sand-500/60 hover:fill-sand-500 hover:scale-105 hover:cursor-pointer transition-all" />
      ),
      link: 'https://www.instagram.com/germanstarterpython/',
    },
    {
      name: 'Twitch',
      icon: (
        <FaTwitch className="text-xl fill-sand-500/60 hover:fill-sand-500 hover:scale-105 hover:cursor-pointer transition-all" />
      ),
      link: 'https://www.twitch.tv/germanscout666',
    },
    {
      name: 'TikTok',
      icon: (
        <FaTiktok className="text-xl fill-sand-500/60 hover:fill-sand-500 hover:scale-105 hover:cursor-pointer transition-all" />
      ),
      link: 'https://www.tiktok.com/@germanstarterpython666',
    },
    {
      name: 'YouTube',
      icon: (
        <FaYoutube className="text-xl fill-sand-500/60 hover:fill-sand-500 hover:scale-105 hover:cursor-pointer transition-all" />
      ),
      link: 'https://www.youtube.com/channel/UCG93H9st6x0W7YNdb1lUX6A/featured',
    },
  ];

  return (
    <footer className="w-full mt-40 min-h-[256px] bg-background-700">
      <PageContent className="h-full">
        <div className="flex justify-between flex-col h-full pt-16">
          <div className="flex justify-center text-center flex-col">
            <Link href="#">
              <a>
                <h3 className="text-5xl text-center mb-5 hover:opacity-70 transition-opacity">
                  German Starter
                </h3>
              </a>
            </Link>
            <div className="flex justify-center">
              <NavItems />
            </div>
          </div>
          <div className="flex justify-between items-center py-5 sm:flex-row flex-col">
            <h3 className="opacity-60">
              © Copyright 2022 All Rights Reserved by german-starter.eu, SUMIS
              and Jona.
            </h3>
            <ul className="flex gap-5">
              {SOCIAL_LINKS.map(({ link, icon, name }, i) => (
                <li key={name + i}>
                  <a href={link} target="_blank" rel="noreferrer">
                    {icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </PageContent>
    </footer>
  );
}
