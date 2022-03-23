import Link from 'next/link';

import { HiOutlineExternalLink } from 'react-icons/hi';

interface NavLinkProps {
  href: string;
  text: string;
  externalLink?: boolean;
}
export default function NavLink({ href, text, externalLink }: NavLinkProps) {
  return (
    <li>
      <Link href={href}>
        <a className="font-bebas flex items-center gap-1 text-2xl lg:text-3xl [text-shadow:0_4px_8px_rgba(0,0,0,0.12)]">
          {text}
          {externalLink && (
            <HiOutlineExternalLink className="text-xl translate-y-[-0.11rem]" />
          )}
        </a>
      </Link>
    </li>
  );
}
