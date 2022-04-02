import { useState } from 'react';

import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

import axios from 'axios';
import { link } from 'fs/promises';
import { getIronSession } from 'iron-session';
import { withIronSessionSsr } from 'iron-session/next';
import { useAuthState } from 'react-firebase-hooks/auth';
import { HiLink, HiUserAdd } from 'react-icons/hi';

import Badge from '../../components/UI/Badge';
import Button from '../../components/UI/Button';
import InfoBox from '../../components/UI/Info';
import Spinner from '../../components/UI/Spinner';
import { auth } from '../../firebase/clientApp';
import useLocalization from '../../hooks/useLocalization';
import { SteamUser } from '../../interfaces/SteamUser';
import { options } from '../../lib/sessionOptions';

interface LinkProps {
  user: SteamUser;
}

const LinkStemAccount: NextPage<LinkProps> = ({ user }: LinkProps) => {
  const t = useLocalization();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const [localUser] = useAuthState(auth);

  const handleClick = () => {
    setLoading(true);

    if (localUser)
      localUser.getIdToken().then((token) => {
        axios
          .get(`/api/steam/linkUser`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(() => {
            router.push('/user');
          })
          .catch((error) => {
            setError(error);
            console.log(error);
          });
      });
  };

  return (
    <div className="flex w-screen h-screen items-center justify-center relative">
      <div className="bg-background-400 p-10 sm:w-96 w-full">
        <h2 className="flex gap-2">
          {t.linkSteam.title} <HiLink />
        </h2>
        {user ? (
          <>
            <div className="flex items-center gap-3 mt-6 mb-4">
              <img src={user.avatar.medium} alt="avatar" />
              <div className="">
                <p className="text-lg leading-none">{user.username}</p>
                <p className="text-sand-500/60 text-xs">{user.steamid}</p>
              </div>
            </div>
            <InfoBox type="warning" info={t.linkSteam.info} />
            <div className="flex justify-between mt-10">
              <Button useLink href="/user/" text={t.from.general.back} />
              <Button
                primary
                onClick={handleClick}
                text={t.from.general.finally}
              >
                {loading && <Spinner className="fill-sand-600 text-white" />}
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="flex text-sm text-sand-500/80">
              {t.user.settings.steamAccount.info}
            </p>
            <InfoBox
              type="warning"
              info={t.linkSteam.linkLater}
              className="mt-3"
            />
            <div className="flex justify-between mt-5">
              <Button useLink href="/user/" text={t.from.general.later} />
              <Link href="/api/steam/auth">
                <a className="font-bebas text-xl py-2 px-4 flex items-center gap-1 text-sand-500 transition duration-150 bg-rust-500 hover:bg-rust-600">
                  {t.linkSteam.shortTitle}
                </a>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res,
}) {
  const user = req.session.steamUser;

  if (!user) {
    return {
      props: {
        user: null,
      },
    };
  }
  return {
    props: { user: req.session.steamUser },
  };
},
options);

export default LinkStemAccount;
