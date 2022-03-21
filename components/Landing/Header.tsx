import useLocalization from "../../hooks/useLocalization";

export default function Header() {
  const t = useLocalization();
  return (
    <header className="w-screen h-screen bg-cover relative flex items-center text-sand-500">
      <div className=" absolute z-10 w-10/12 mx-auto block">
        <h1>German Starter</h1>
        <p className="sm:max-w-[30%]">{t.headerText}</p>
      </div>
      <img
        src="/assets/images/banner_bg.png"
        alt="banner"
        className="object-cover w-full h-full opacity-70 absolute"
      />
    </header>
  );
}
