import type { NextPage } from 'next';
import Header from '../components/Landing/Header';
import Navbar from '../components/Navbar';
import useLocalization from '../hooks/useLocalization';

const Home: NextPage = () => {
  const t = useLocalization();
  return (
    <>
      <Navbar />
      <div className="">
        <Header />
      </div>
    </>
  );
};

export default Home;
