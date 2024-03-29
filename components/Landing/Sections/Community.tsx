import Image from 'next/image';

import { HiUserGroup } from 'react-icons/hi';

import useLocalization from '../../../hooks/useLocalization';
import DiscordButton from '../../Buttons/DiscordButton';
import TeamspeakButton from '../../Buttons/TeamspeakButton';
import Badge from '../../UI/Badge';

export default function Community() {
  const t = useLocalization();

  return (
    <section className="mx-auto max-w-screen-xl items-center gap-10 sm:m-10 sm:mt-48 md:flex">
      <div className="relative aspect-video w-full md:h-72 md:w-auto">
        <Badge
          text="Community"
          className="absolute translate-x-5 -translate-y-5 z-10"
        >
          <HiUserGroup className="text-xl" />
        </Badge>
        <div className="h-full w-full absolute">
          <Image
            src="/assets/images/community.webp"
            className="absolute inset-0"
            layout="fill"
            objectFit="cover"
            alt=""
          />
        </div>
      </div>
      <div className="sm:p-0 p-3">
        <h2>{t.community.title}</h2>
        <p className="mb-4">{t.community.text}</p>
        <div className="flex gap-4">
          <DiscordButton />
          <TeamspeakButton />
        </div>
      </div>
    </section>
  );
}
