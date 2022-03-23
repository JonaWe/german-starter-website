import useServerConfig from '../../../hooks/useServerConfig';
import Button from '../../UI/Button';

export default function CopyButton() {
  const [config] = useServerConfig();

  return (
    <Button text="Discord" useLink href={config?.discordUrl}>
      <img src="/assets/icons/discord.svg" className="w-5" alt="Teamspeak" />
    </Button>
  );
}
