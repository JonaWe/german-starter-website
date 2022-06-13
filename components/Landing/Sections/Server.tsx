import Image from 'next/image';

import axios from 'axios';
import { useQuery } from 'react-query';

import useDocumentDataFromCollectionOnce from '../../../hooks/useDocumentDataFromCollectionOnce';
import useLocalization from '../../../hooks/useLocalization';
import useServerMap from '../../../hooks/useServerMap';
import CopyButton from '../../Buttons/CopyButton';
import JoinButton from '../../Buttons/JoinButton';
import PlayerCount from '../../PlayerCount';
import RustMap from '../../RustMap';
import Badge from '../../UI/Badge';
import Button from '../../UI/Button';
import Tooltip from '../../UI/Tooltip';

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

  const { data: map, refetch } = useServerMap();

  return (
    <section className="sm:m-10 sm:mt-32 mb-20 sm:mb-0">
      <div className="mx-auto h-full max-w-screen-md bg-background-400/60 p-5 pb-12 text-center relative">
        <Badge text="Server" className="mx-auto -translate-y-10 relative z-10">
          <div className="relative w-7 h-7">
            <Image
              src="/assets/icons/rust2.svg"
              layout="fill"
              alt=""
              className="absolute let-0 top-0"
            />
          </div>
        </Badge>
        <div className="z-10 relative">
          <h2 className="text-5xl">[EU] German Starter Server</h2>
          <div className="flex justify-center gap-4">
            <Tooltip text="Click to copy server ip">
              <CopyButton text={serverIP} title="Click to copy server IP" />
            </Tooltip>
            <Tooltip text="Players on server">
              <PlayerCount serverIp={serverIP} className="text-sand-600" />
            </Tooltip>
          </div>
          <div className="mt-6 flex justify-center gap-5">
            <JoinButton />
            <Button href="/rules" text="Rules" useLink />
            <RustMap reload={refetch} map={map} variant="button" />
          </div>
        </div>
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={map?.imageUnlabeled}
            alt="map"
            className="object-cover opacity-40 mix-blend-multiply"
          />
        </div>
      </div>
    </section>
  );
}
