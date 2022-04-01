import Image from 'next/image';

import { Parallax } from 'react-parallax';

import useLocalization from '../../../../hooks/useLocalization';

export default function Team() {
  const t = useLocalization();
  return (
    <Parallax
      bgImage="assets/images/community.png"
      bgImageAlt="the cat"
      strength={200}
      className="w-screen min-h-[60vh] overflow-hidden bg-center bg-cover bg-no-repeat flex justify-center mt-32"
    >
      <div className="w-full max-w-screen-2xl">
        <div className="mx-auto max-w-screen-xl items-center gap-10 sm:m-10 sm:mt-48 md:flex">
          <p>hallo</p>
        </div>
      </div>
    </Parallax>
  );
}
