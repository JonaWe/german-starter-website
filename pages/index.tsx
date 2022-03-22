import type { NextPage } from 'next';
import Header from '../components/Landing/Header';
import ServerSection from '../components/Landing/Sections/ServerSection';
import Navbar from '../components/Navbar';
import useLocalization from '../hooks/useLocalization';

const Home: NextPage = () => {
  const t = useLocalization();
  return (
    <div className="">
      <Navbar />
      <Header />
      <ServerSection />
    </div>
  );
};

export default Home;
