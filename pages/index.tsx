import type { NextPage } from 'next';

import Footer from '../components/Footer';
import Header from '../components/Landing/Header';
import Benefits from '../components/Landing/Sections/Benefits/Benefits';
import Community from '../components/Landing/Sections/Community';
import Server from '../components/Landing/Sections/Server';
import Team from '../components/Landing/Sections/Team';
import { getDefaultLayout } from '../components/Layout/DefaultLayout';
import PageContent from '../components/PageContent';
import useLocalization from '../hooks/useLocalization';
import { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => {
  const t = useLocalization();
  return (
    <div className="">
      <Header />
      <PageContent>
        <Server />
        <Community />
        <Benefits />
      </PageContent>
      <Team />
      <Footer />
    </div>
  );
};

Home.getLayout = getDefaultLayout();

export default Home;
