import type { NextPage } from 'next';
import Header from '../components/Landing/Header';
import Community from '../components/Landing/Sections/Community';
import Server from '../components/Landing/Sections/Server';
import Benefits from '../components/Landing/Sections/Benefits/Benefits';
import Navbar from '../components/Navbar';
import PageContent from '../components/PageContent';
import useLocalization from '../hooks/useLocalization';

const Home: NextPage = () => {
  const t = useLocalization();
  return (
    <div className="">
      <Header />
      <PageContent>
        <Server />
        <Community />
        <Benefits />
      </PageContent>
    </div>
  );
};

export default Home;
