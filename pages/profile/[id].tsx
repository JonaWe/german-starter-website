import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';

import { PrismaClient } from '@prisma/client';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const steamId = BigInt(params?.id as string);

  const prisma = new PrismaClient();

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
        steamId && player ? `/profile/${steamId}/${player.name}` : '/404',
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
