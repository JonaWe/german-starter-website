import type { NextPage } from 'next';
import Header from '../components/Landing/Header';
import useLocalization from '../hooks/useLocalization';

const Home: NextPage = () => {
  const t = useLocalization();
  return (
    <div className="">
      <Header />
    </div>
  );
};

export default Home;
