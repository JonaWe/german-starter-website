import Image from 'next/image';

import { Background, Parallax } from 'react-parallax';

import useLocalization from '../../hooks/useLocalization';
import Banner from '../../public/assets/images/banner_bg_4.webp';
import WinterBanner from '../../public/assets/images/winter-banner.png';
import JoinButton from '../Buttons/JoinButton';
import Button from '../UI/Button';
import SocialProofItem, { Format } from './SocialProofItem';

const isWinter = () => {
  const today = new Date();
  const month = today.getMonth();

  return [11].includes(month);
};

export default function Header({
  playerCount,
  totalPvPEvents,
  discordMembers,
}: {
  playerCount: number;
  discordMembers: number;
  totalPvPEvents: number;
}) {
  const t = useLocalization();

  const socialProofItems = [
    {
      name: t.header.socialProof.community,
      value: playerCount,
      format: 'compact',
    },
    {
      name: t.header.socialProof.events,
      value: totalPvPEvents,
      format: 'compact',
    },
    {
      name: t.header.socialProof.discordMembers,
      value: discordMembers,
      format: 'compact',
    },
  ];

  return (
    <Parallax
      strength={200}
      className="w-screen min-h-screen after:absolute after:top-0 after:right-0 after:left-0 after:h-[35vh] after:bg-gradient-to-b after:from-black/20"
    >
      <div>
        <header className="flex h-screen w-screen items-center p-5 sm:px-0">
          <div className="w-full text-center flex items-center flex-col">
            <h1 className="leading-none tracking-widest md:-mb-10">German</h1>
            <h1 className="leading-none tracking-widest">Starter</h1>
            <p className="mb-6 sm:max-w-[30%]">{t.header.text}</p>
            <div className="flex gap-5">
              <span className="hidden sm:block">
                <JoinButton />
              </span>
              <Button text={t.infoBtn} useLink href="#server" />
            </div>
          </div>
        </header>
        <div className="md:-mt-24 -mt-12 w-full bg-background-500 flex items-center justify-center md:pt-10 pt-3">
          <div className="flex justify-between gap-5 sm:gap-20 sm:overflow-hidden overflow-auto">
            {socialProofItems.map(({ name, value, format }, i) => (
              <SocialProofItem
                key={name + i}
                name={name}
                value={value}
                format={format as Format}
              />
            ))}
          </div>
        </div>
      </div>
      <Background className="w-screen h-screen">
        <Image
          src={
            process.env.NEXT_PUBLIC_WINTER_BANNER || isWinter()
              ? WinterBanner
              : Banner
          }
          placeholder={'blur'}
          alt="banner"
          layout="fill"
          objectFit="cover"
          className="opacity-100"
        />
      </Background>
    </Parallax>
  );
}
