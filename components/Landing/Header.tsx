import useLocalization from '../../hooks/useLocalization';
import JoinButton from '../Buttons/JoinButton';

export default function Header() {
  const t = useLocalization();
  return (
    <header className="w-screen h-screen bg-cover relative flex items-center text-sand-500 sm:px-24 p-5">
      <div className=" absolute z-10 w-10/12 mx-auto block">
        <h2>{t.subHeader}</h2>
        <h1 className="leading-none sm:text-[10rem] text-8xl">German Starter</h1>
        <p className="sm:max-w-[30%] mb-6">{t.headerText}</p>
        <JoinButton />
      </div>
      <img
        src="/assets/images/banner_bg.png"
        alt="banner"
        className="object-cover w-full h-full opacity-70 absolute inset-0"
      />
    </header>
  );
}
