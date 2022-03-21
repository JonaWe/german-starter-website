import type { NextPage } from 'next';
import useLocalization from '../hooks/useLocalization';

const Home: NextPage = () => {
  const t = useLocalization();
  return <h1 className="text-red-800">{t.test}</h1>;
};

export default Home;
