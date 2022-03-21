import type { NextPage } from "next";
import Header from "../components/Landing/Header";
import useLocalization from "../hooks/useLocalization";

const Home: NextPage = () => {
  const t = useLocalization();
  return (
    <div className="">
      <Header />
      <h1 className="text-rust-500">{t.test}</h1>
    </div>
  );
};

export default Home;
