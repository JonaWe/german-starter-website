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
        <a className="flex items-center gap-1">
          {text}
          {externalLink && <HiOutlineExternalLink />}
        </a>
      </Link>
    </li>
  );
}
