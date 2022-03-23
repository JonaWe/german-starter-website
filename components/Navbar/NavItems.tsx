import { AnimateSharedLayout } from 'framer-motion';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useLocalization from '../../hooks/useLocalization';
import NavLink from './NavLink';

interface NavigationItem {
  id: 'home' | 'news' | 'support' | 'rules' | 'playerstats';
  href: string;
  external: boolean;
}

const navigationItems: NavigationItem[] = [
  { id: 'home', href: '/', external: false },
  { id: 'news', href: '/news', external: false },
  { id: 'support', href: '/support', external: false },
  { id: 'rules', href: '/rules', external: false },
  {
    id: 'playerstats',
    href: 'https://playerstats.german-starter.de/',
    external: true,
  },
];

export default function NavItems() {
  const router = useRouter();
  const [activeItem, setActiveItem] = useState(router.asPath);
  const t = useLocalization();
  return (
    <nav>
      <ul className="flex flex-row gap-7 justify-self-end">
        <AnimateSharedLayout>
          {navigationItems.map(({ id, href, external }, index) => {
            return (
              <NavLink
                text={t.navigation[id]}
                href={href}
                externalLink={external}
                selected={activeItem === href}
                key={index}
                onClick={() => setActiveItem(href)}
              />
            );
          })}
        </AnimateSharedLayout>
      </ul>
    </nav>
  );
}
