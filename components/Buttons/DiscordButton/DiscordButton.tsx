import { useEffect } from "react";
import useServerConfig from "../../../hooks/useServerConfig";
import Button from "../../UI/Button";

export default function CopyButton() {
  const [config] = useServerConfig();

  useEffect(() => {
    console.log(config);
    
  }, [config])

  return (
    <Button text="Discord" useLink href={config?.discordUrl}>
      <img src="/assets/icons/discord.svg" className="w-5" alt="Teamspeak" />
    </Button>
  );
}
