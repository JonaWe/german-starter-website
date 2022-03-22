import JoinButton from '../JoinButton';
import LanguageSelection from './LanguageSelection';
import NavItems from './NavItems';
import NavLogo from './NavLogo';

export default function Navbar() {
  return (
    <nav className="">
      <NavLogo />
      <LanguageSelection />
      <NavItems />
      <JoinButton />
    </nav>
  );
}
