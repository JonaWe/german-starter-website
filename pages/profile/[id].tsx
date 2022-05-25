import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';

import { prisma } from '../../lib/stats/db';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  let steamId: bigint;

  try {
    steamId = BigInt(params?.id as string);
  } catch {
    return {
      redirect: {
        permanent: false,
        destination: '/404',
      },
      props: {},
    };
  }

  const player = await prisma.players.findUnique({
    where: {
      steamid: steamId,
    },
    select: {
      name: true,
    },
  });

  return {
    redirect: {
      permanent: false,
      destination:
        steamId && player
          ? encodeURI(`/profile/${steamId}/${player.name}`)
          : '/404',
    },
    props: {},
  };
};

const Profiles: NextPage = () => {
  return (
    <>
      <Link href="/">Home</Link>
    </>
  );
};

export default Profiles;
