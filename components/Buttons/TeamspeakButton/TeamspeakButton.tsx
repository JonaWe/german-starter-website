import Image from 'next/image';

import useServerConfig from '../../../hooks/useServerConfig';
import Button from '../../UI/Button';

export default function TeamspeakButton() {
  const [config] = useServerConfig();
  return (
    <Button text="Teamspeak" useLink href={config?.teamspeakUrl}>
      <div className="relative w-5 h-5">
        <Image
          src="/assets/icons/teamspeak.svg"
          className="absolute top-0 left-0"
          layout="fill"
          alt="Teamspeak"
        />
      </div>
    </Button>
  );
}
