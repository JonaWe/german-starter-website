import Image from 'next/image';

import useScrollDistance from '../../hooks/useScrollDistance';
import PageContent from '../PageContent';

interface PageHeaderProps {
  children: React.ReactNode;
  imageURL: string;
}

export default function PageHeader({ imageURL, children }: PageHeaderProps) {
  const scrollDistance = useScrollDistance();

  return (
    <header className="relative flex h-[45vh] w-screen items-end bg-cover">
      <PageContent>
        <div className="z-10 leading-none relative w-full h-full flex items-end">
          {children}
        </div>
      </PageContent>
      <div
        className="absolute w-full h-full"
        style={{
          filter: `blur(${Math.floor(scrollDistance / 20)}px)`,
          opacity: 0.7 - 0.0015 * scrollDistance,
        }}
      >
        <Image
          src={imageURL}
          alt="page banner"
          layout="fill"
          objectFit="cover"
        />
      </div>
    </header>
  );
}
