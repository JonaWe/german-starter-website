import type { NextPage } from 'next';
import useLocalization from '../hooks/useLocalization';

const Home: NextPage = () => {
  const t = useLocalization();
  return <h1 className="text-rust-500">{t.test}</h1>;
};

export default Home;
