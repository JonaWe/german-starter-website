import { useEffect, useState } from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';

import { AnimateSharedLayout } from 'framer-motion';

import useLocalization from '../../hooks/useLocalization';
import NavLink from './NavLink';

export interface NavigationItem {
  id: 'home' | 'news' | 'support' | 'rules' | 'playerstats';
  href: string;
  external: boolean;
}

export const navigationItems: NavigationItem[] = [
  { id: 'news', href: '/news', external: false },
  { id: 'support', href: '/support', external: false },
  { id: 'rules', href: '/rules', external: false },
  {
    id: 'playerstats',
    href: '/stats', //'https://playerstats.german-starter.de/',
    external: false, // true
  },
];

export default function NavItems() {
  const router = useRouter();
  const [activeItem, setActiveItem] = useState(router.asPath);
  const t = useLocalization();

  useEffect(() => {
    const updateActiveItem = (url: string) => {
      const languagePrefixTrimmedURL = url.substring(url.lastIndexOf('/'));
      setActiveItem(
        languagePrefixTrimmedURL === '/en' ? '/' : languagePrefixTrimmedURL
      );
    };

    router.events.on('routeChangeStart', updateActiveItem);

    return () => {
      router.events.off('routeChangeStart', updateActiveItem);
    };
  }, [router]);

  const currentNavItem =
    activeItem === '/'
      ? ''
      : navigationItems.find((item) => item.href === activeItem);

  return (
    <>
      <Head>
        <title>
          German Starter |{' '}
          {currentNavItem === ''
            ? 'Home'
            : currentNavItem
            ? t.navigation[currentNavItem.id]
            : activeItem.replace('/', '')}
        </title>
      </Head>
      <nav className="md:flex flex-row place-content-between items-center gap-7 h-full overflow-hidden md:mx-auto">
        <ul className="md:flex flex-row gap-7 justify-self-end">
          <AnimateSharedLayout>
            {navigationItems.map(({ id, href, external }, index) => {
              return (
                <NavLink
                  text={t.navigation[id]}
                  href={href}
                  externalLink={external}
                  selected={activeItem === href}
                  key={index}
                />
              );
            })}
          </AnimateSharedLayout>
        </ul>
      </nav>
    </>
  );
}
