import { useState } from 'react';

import { HiMenuAlt3, HiX } from 'react-icons/hi';

import useScrollDistance from '../../hooks/useScrollDistance';
import LanguageSelection from './LanguageSelection';
import NavItems from './NavItems';
import NavLogo from './NavLogo';
import NavUserMenu from './NavUserMenu';

export default function Navbar() {
  const scrollDistance = useScrollDistance();
  const [active, setActive] = useState(false);

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
          <span className="hidden md:block">
            <LanguageSelection />
          </span>
        </div>
        <div
          className={`flex md:items-center md:gap-0 gap-4 flex-col-reverse md:flex-row justify-between w-2/3 bg-background-500 md:bg-transparent md:relative absolute right-0 top-0 md:w-full md:h-fit h-screen p-5 md:p-0 ${
            !active ? 'translate-x-full md:translate-x-0' : 'translate-x-0'
          } transition-all duration-[400ms] z-50`}
        >
          <NavItems />
          <NavUserMenu />
          <div className="flex items-center justify-between mb-[10vh] md:hidden">
            <button onClick={() => setActive(false)}>
              <HiX className="text-3xl fill-sand-500/80" />
            </button>
            <LanguageSelection />
          </div>
        </div>
        <button onClick={() => setActive(true)}>
          <HiMenuAlt3 className="text-3xl fill-sand-500 md:hidden" />
        </button>
      </div>
      <div
        className={`md:hidden block absolute inset-0 h-screen bg-background-500/50 ${
          active ? 'opacity-100' : 'opacity-0 pointer-events-none'
        } transition-all duration-[400ms]`}
        onClick={() => setActive(false)}
      />
    </header>
  );
}
