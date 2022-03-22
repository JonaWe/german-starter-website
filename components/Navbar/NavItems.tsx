import NavLink from './NavLink';

export default function NavItems() {
  return (
    <ul>
      <NavLink text="Home" href="/" />
      <NavLink text="News" href="/news" />
      <NavLink text="Support" href="/support" />
      <NavLink text="Rules" href="/rules" />
      <NavLink
        text="Playerstats"
        href="https://playerstats.german-starter.de/"
        externalLink
      />
    </ul>
  );
}
