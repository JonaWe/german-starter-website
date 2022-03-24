import useLocalization from '../../hooks/useLocalization';
import JoinButton from '../Buttons/JoinButton';

export default function Header() {
  const t = useLocalization();
  return (
    <header className="relative flex h-screen w-screen items-center bg-cover p-5 text-sand-500 sm:px-24">
      <div className=" absolute z-10 mx-auto block w-10/12">
        <h2>{t.subHeader}</h2>
        <h1 className="leading-none">German Starter</h1>
        <p className="mb-6 sm:max-w-[30%]">{t.headerText}</p>
        <JoinButton />
      </div>
      <img
        src="/assets/images/banner_bg.png"
        alt="banner"
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      />
    </header>
  );
}
