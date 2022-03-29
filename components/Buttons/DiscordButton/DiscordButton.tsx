import Image from 'next/image';

import useServerConfig from '../../../hooks/useServerConfig';
import Button from '../../UI/Button';

export default function DiscordButton() {
  const [config] = useServerConfig();

  return (
    <Button text="Discord" useLink href={config?.discordUrl}>
      <div className="w-5 h-5 relative">
        <Image
          src="/assets/icons/discord.svg"
          alt="Teamspeak"
          className="absolute top-0 left-0"
          layout="fill"
        />
      </div>
    </Button>
  );
}
