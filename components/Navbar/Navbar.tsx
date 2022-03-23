import useScrollDistance from '../../hooks/useScrollDistance';
import JoinButton from '../Buttons/JoinButton';
import LanguageSelection from './LanguageSelection';
import NavItems from './NavItems';
import NavLogo from './NavLogo';

export default function Navbar() {
  const scrollDistance = useScrollDistance();

  return (
    <header
      className={`fixed z-50 w-screen flex justify-center px-6 py-2 overflow-hidden ${
        scrollDistance === 0
          ? 'bg-transparent drop-shadow-none pt-8'
          : 'bg-background-500 drop-shadow-xl pt-2'
      } transition-all duration-[400ms]`}
    >
      <div className="w-full max-w-screen-2xl flex flex-row gap-4 items-center place-content-between">
        <div className="flex flex-row items-center gap-4 place-content-between">
          <NavLogo />
          <LanguageSelection />
        </div>
        <div className="flex flex-row items-center gap-7 place-content-between">
          <NavItems />
          <JoinButton />
        </div>
      </div>
    </header>
  );
}
