import { Parallax } from 'react-parallax';

import useLocalization from '../../../../hooks/useLocalization';
import Badge from '../../../UI/Badge';
import TeamGroup from './TeamGroup';

const GROUP_DEVELOPER = [
  {
    name: 'Sumis',
    image: '/assets/team_avatars/sumis.webp',
    link: 'https://github.com/Sumis34',
  },
  {
    name: 'Jona',
    image: '/assets/team_avatars/jona.jpg',
    link: 'https://github.com/JonaWe',
  },
];

const GROUP_ADMINS = [
  {
    name: 'Stanley Tylon',
    image: '/assets/team_avatars/stanley_tylon.png',
    link: 'https://steamcommunity.com/profiles/76561197961262339',
  },
  {
    name: 'Banana Joe',
    image: '/assets/team_avatars/banana_joe.png',
    link: 'https://steamcommunity.com/profiles/76561197961262339',
  },
];

const GROUP_OWNER = [
  {
    name: 'Neo',
    image: '/assets/team_avatars/neo.png',
    link: 'https://steamcommunity.com/profiles/76561197961262339',
  },
  {
    name: 'Python',
    image: '/assets/team_avatars/python.png',
    link: 'https://steamcommunity.com/profiles/76561197961262339',
  },
  {
    name: 'newton',
    image: '/assets/team_avatars/newton.png',
    link: 'https://steamcommunity.com/profiles/76561197961262339',
  },
];

export default function Team() {
  const t = useLocalization();
  return (
    <section className="relative">
      <div className="w-full absolute -top-6 left-0 z-10">
        <Badge className="mx-auto" text="The Server Team" />
      </div>
      <Parallax
        bgImage="assets/images/team_banner.png"
        bgImageAlt="the cat"
        strength={200}
        className="w-screen overflow-hidden bg-center bg-cover bg-no-repeat flex justify-center mt-32"
      >
        <div className="w-full max-w-screen-2xl">
          <div className="mx-auto max-w-screen-xl items-center gap-8 lg:gap-12 flex flex-col my-16 lg:my-24">
            <TeamGroup members={GROUP_OWNER} title={'Owner'} />
            <TeamGroup members={GROUP_ADMINS} title={'Admins'} />
            <TeamGroup members={GROUP_DEVELOPER} title={'Developer'} />
          </div>
        </div>
      </Parallax>
    </section>
  );
}
