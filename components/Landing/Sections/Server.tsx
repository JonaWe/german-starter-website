import useLocalization from '../../../hooks/useLocalization';
import Badge from '../../UI/Badge';
import CopyButton from '../../Buttons/CopyButton';
import useDocumentDataFromCollectionOnce from '../../../hooks/useDocumentDataFromCollectionOnce';
import JoinButton from '../../Buttons/JoinButton';
import Button from '../../UI/Button';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import PlayerCount from '../../PlayerCount';

export default function Server() {
  const [serverConfig, loading, error] = useDocumentDataFromCollectionOnce(
    'config',
    'server'
  );

  const t = useLocalization();

  const serverIP =
    !loading && !error && serverConfig
      ? serverConfig.ip
      : '51.195.60.162:28015';

  return (
    <section className="sm:m-10 sm:mt-32">
      <div className="mx-auto h-full max-w-screen-md bg-background-400 p-5 pb-12 text-center">
        <Badge text="Server" className="mx-auto -translate-y-10">
          <img src="/assets/icons/rust2.svg" alt="" className="w-7" />
        </Badge>
        <h2 className="text-5xl">[EU] German Starter Server</h2>
        <div className="flex justify-center gap-4">
          <CopyButton text={serverIP} title="Click to copy server IP" />
          <PlayerCount
            serverIp={serverIP}
            className="text-sand-600"
            title="Players on server"
          />
        </div>
        <p>{t.serverDescription}</p>
        <div className="mt-6 flex justify-center gap-5">
          <JoinButton />
          <Button
            href="/rules"
            text="Rules"
            useLink
            className="hover:bg-neutral-500 hover:text-sand-600"
          />
        </div>
      </div>
    </section>
  );
}
