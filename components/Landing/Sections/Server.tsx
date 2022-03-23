import useLocalization from '../../../hooks/useLocalization';
import Badge from '../../UI/Badge';
import CopyButton from '../../CopyButton';
import useDocumentDataFromCollectionOnce from '../../../hooks/useDocumentDataFromCollectionOnce';
import JoinButton from '../../JoinButton';
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
    <section className="my-32 sm:m-10">
      <div className="bg-background-400 h-full max-w-screen-lg mx-auto p-5 pb-12 text-center">
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
        <div className="flex gap-5 justify-center mt-6">
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
