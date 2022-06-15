import Image from 'next/image';

import CountUp from 'react-countup';
import { Background, Parallax } from 'react-parallax';
import reactStringReplace from 'react-string-replace';

import useLocalization from '../../hooks/useLocalization';
import JoinButton from '../Buttons/JoinButton';
import Button from '../UI/Button';

export default function Header({ playerCount }: { playerCount: number }) {
  const t = useLocalization();

  return (
    <Parallax
      strength={200}
      className="w-screen h-screen after:absolute after:top-0 after:right-0 after:left-0 after:h-[35vh] after:bg-gradient-to-b after:from-black/20"
    >
      <header className="relative flex h-screen w-screen items-center bg-cover p-5 text-sand-500 sm:px-24">
        <div className=" absolute z-10 mx-auto block w-10/12">
          <h2>{t.subHeader}</h2>
          <h1 className="leading-none">
            {reactStringReplace(t.header, /(\${\w+})/g, () => {
              return (
                <span className="relative">
                  <span className="opacity-0">{playerCount}</span>
                  <span className="left-0 absolute">
                    <CountUp end={playerCount} />
                  </span>
                </span>
              );
            })}
          </h1>
          <p className="mb-6 sm:max-w-[30%]">{t.headerText}</p>
          <div className="flex gap-5">
            <JoinButton />
            <Button text={t.infoBtn} useLink href="#server"/>
          </div>
        </div>
      </header>
      <Background className="w-screen h-screen">
        <Image
          src="/assets/images/banner_bg_3_alpha_90.png"
          alt="banner"
          layout="fill"
          objectFit="cover"
          className="opacity-100"
        />
      </Background>
    </Parallax>
  );
}
