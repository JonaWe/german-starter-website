import Image from 'next/image';

import useDocumentDataFromCollectionOnce from '../../../hooks/useDocumentDataFromCollectionOnce';
import useLocalization from '../../../hooks/useLocalization';
import CopyButton from '../../Buttons/CopyButton';
import JoinButton from '../../Buttons/JoinButton';
import PlayerCount from '../../PlayerCount';
import Badge from '../../UI/Badge';
import Button from '../../UI/Button';

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
          <div className="relative w-7 h-7">
            <Image
              src="/assets/icons/rust2.svg"
              layout="fill"
              alt=""
              className="absolute let-0 top-0"
            />
          </div>
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
