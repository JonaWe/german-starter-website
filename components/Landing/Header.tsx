import Image from 'next/image';

import { Background, Parallax } from 'react-parallax';

import useLocalization from '../../hooks/useLocalization';
import JoinButton from '../Buttons/JoinButton';

export default function Header() {
  const t = useLocalization();
  return (
    <Parallax
      strength={200}
      className="w-screen h-screen after:absolute after:top-0 after:right-0 after:left-0 after:h-[35vh] after:bg-gradient-to-b after:from-black/20"
    >
      <header className="relative flex h-screen w-screen items-center bg-cover p-5 text-sand-500 sm:px-24">
        <div className=" absolute z-10 mx-auto block w-10/12">
          <h2>{t.subHeader}</h2>
          <h1 className="leading-none">German Starter</h1>
          <p className="mb-6 sm:max-w-[30%]">{t.headerText}</p>
          <JoinButton />
        </div>
      </header>
      <Background className="w-screen h-screen">
        <Image
          src="/assets/images/banner.jpg"
          alt="banner"
          layout="fill"
          objectFit="cover"
          className="opacity-70"
        />
      </Background>
    </Parallax>
  );
}
