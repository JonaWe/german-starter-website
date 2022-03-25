import useServerConfig from '../../../hooks/useServerConfig';
import Button from '../../UI/Button';

export default function TeamspeakButton() {
  const [config] = useServerConfig();
  return (
    <Button text="Teamspeak" useLink href={config?.teamspeakUrl}>
      <img src="/assets/icons/teamspeak.svg" className="w-5" alt="Teamspeak" />
    </Button>
  );
}
