import useScrollDistance from '../../hooks/useScrollDistance';
import LanguageSelection from './LanguageSelection';
import NavItems from './NavItems';
import NavLogo from './NavLogo';
import NavUserMenu from './NavUserMenu';

export default function Navbar() {
  const scrollDistance = useScrollDistance();

  return (
    <header
      className={`left-0 top-0 fixed z-50 flex w-screen justify-center px-6 py-2 ${
        scrollDistance === 0
          ? 'bg-transparent pt-8 drop-shadow-none'
          : 'bg-background-500 pt-2 drop-shadow-xl'
      } transition-all duration-[400ms]`}
    >
      <div className="flex w-full max-w-screen-2xl flex-row place-content-between items-center gap-4">
        <div className="flex flex-row place-content-between items-center gap-4">
          <NavLogo />
          <LanguageSelection />
        </div>
        <NavItems />
        <NavUserMenu />
      </div>
    </header>
  );
}
