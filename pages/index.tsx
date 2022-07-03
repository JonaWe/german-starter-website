import Header from '../components/Landing/Header';
import Benefits from '../components/Landing/Sections/Benefits/Benefits';
import Community from '../components/Landing/Sections/Community';
import Server from '../components/Landing/Sections/Server';
import Team from '../components/Landing/Sections/Team';
import { getDefaultLayout } from '../components/Layout/DefaultLayout';
import PageContent from '../components/PageContent';
import useLocalization from '../hooks/useLocalization';
import { prisma } from '../lib/stats/db';
import { NextPageWithLayout } from './_app';

interface HomeProps {
  totalPlayerCount: number;
  totalPvPEvents: number;
}

const Home: NextPageWithLayout<HomeProps> = ({
  totalPlayerCount,
  totalPvPEvents,
}) => {
  const t = useLocalization();
  return (
    <div className="">
      <Header
        playerCount={totalPlayerCount}
        totalPvPEvents={totalPvPEvents}
      />
      <PageContent>
        <Server />
        <Community />
        <Benefits />
      </PageContent>
      <Team />
    </div>
  );
};

Home.getLayout = getDefaultLayout();

export async function getServerSideProps() {
  let totalPlayerCount = 0;
  let totalPvPEvents: any;

  try {
    totalPlayerCount = await prisma.players.count();
    totalPvPEvents =
      await prisma.$queryRaw`SELECT count(killer_steamid) as totalPvPEvents FROM pvplog`;
    totalPvPEvents = totalPvPEvents[0].totalPvPEvents;
  } catch (err) {
    totalPlayerCount = -1;
    totalPvPEvents = -1;
    console.log(err);
  }

  return {
    props: {
      totalPlayerCount,
      totalPvPEvents,
    },
  };
}

export default Home;
