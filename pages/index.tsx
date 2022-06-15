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
}

const Home: NextPageWithLayout<HomeProps> = ({ totalPlayerCount }) => {
  const t = useLocalization();
  return (
    <div className="">
      <Header playerCount={totalPlayerCount} />
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

  try {
    totalPlayerCount = await prisma.players.count();
  } catch {
    totalPlayerCount = -1;
  }

  return {
    props: {
      totalPlayerCount: totalPlayerCount,
    },
  };
}

export default Home;
