import type { NextPage } from 'next';
import Header from '../components/Landing/Header';
import Community from '../components/Landing/Sections/Community';
import Server from '../components/Landing/Sections/Server';
import Navbar from '../components/Navbar';
import useLocalization from '../hooks/useLocalization';

const Home: NextPage = () => {
  const t = useLocalization();
  return (
    <div className="">
      <Header />
      <Server/>
      <Community />
    </div>
  );
};

export default Home;
