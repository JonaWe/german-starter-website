import { NextPage } from 'next';

import { getIronSession } from 'iron-session';
import { withIronSessionSsr } from 'iron-session/next';

import { SteamUser } from '../../interfaces/SteamUser';
import { options } from '../../lib/sessionOptions';

interface LinkProps {
  user: SteamUser;
}

const linkStemAccount: NextPage<LinkProps> = ({ user }: LinkProps) => {
  return (
    <>
      Link steam account <p>{user.steamid}</p>
    </>
  );
};

export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res,
}) {
  const user = req.session.steamUser;

  if (!user) {
    res.setHeader('location', '/api/steam/auth');
    res.statusCode = 302;
    res.end();
    return {
      props: {
        user: undefined,
      },
    };
  }
  return {
    props: { user: req.session.steamUser },
  };
},
options);

export default linkStemAccount;
