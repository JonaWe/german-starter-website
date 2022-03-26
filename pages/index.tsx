import type { NextPage } from 'next';
import Footer from '../components/Footer';

import Header from '../components/Landing/Header';
import Benefits from '../components/Landing/Sections/Benefits/Benefits';
import Community from '../components/Landing/Sections/Community';
import Server from '../components/Landing/Sections/Server';
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
      <Footer />
    </div>
  );
};

export default Home;
