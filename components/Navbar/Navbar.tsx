import { useEffect, useState } from 'react';
import useScrollDistance from '../../hooks/useScrollDistance';
import JoinButton from '../JoinButton';
import LanguageSelection from './LanguageSelection';
import NavItems from './NavItems';
import NavLogo from './NavLogo';

export default function Navbar() {
  const scrollDistance = useScrollDistance();

  return (
    <header
      className={`fixed z-50 w-screen flex flex-row gap-4 items-center place-content-between px-6 py-2 ${
        scrollDistance === 0
          ? 'bg-transparent drop-shadow-none'
          : 'bg-background-500 drop-shadow-xl'
      } transition-colors duration-[400ms]`}
    >
      <div className="flex flex-row items-center gap-4 place-content-between">
        <NavLogo />
        <LanguageSelection />
      </div>
      <div className="flex flex-row items-center gap-7 place-content-between">
        <NavItems />
        <JoinButton />
      </div>
    </header>
  );
}
