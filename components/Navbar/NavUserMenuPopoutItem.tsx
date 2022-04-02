import { AnchorHTMLAttributes, DetailedHTMLProps } from 'react';

import Link from 'next/link';

import { Menu } from '@headlessui/react';

interface NavUserMenuPopoutItemProps {
  href: string;
  title: string;
  options?: DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >;
}

export default function NavUserMenuPopoutItem({
  href,
  title,
  options,
}: NavUserMenuPopoutItemProps) {
  return (
    <>
      <Menu.Item>
        {({ active }) => (
          <Link href={href}>
            <a
              className={`${
                active ? 'bg-background-400/40 text-sand-500' : ''
              } w-full px-6 py-2 text-center`}
              {...options}
            >
              {title}
            </a>
          </Link>
        )}
      </Menu.Item>
    </>
  );
}
