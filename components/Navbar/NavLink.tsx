import { motion } from 'framer-motion';
import Link from 'next/link';
import { HiOutlineExternalLink } from 'react-icons/hi';

interface NavLinkProps {
  href: string;
  text: string;
  externalLink?: boolean;
  selected?: boolean;
}
export default function NavLink({
  href,
  text,
  externalLink,
  selected,
}: NavLinkProps) {
  return (
    <li>
      <Link href={href}>
        <a
          className="font-bebas text-2xl [text-shadow:0_4px_8px_rgba(0,0,0,0.12)] lg:text-3xl"
          target={externalLink ? '_blank' : '_self'}
        >
          <div className="relative w-fit">
            <div
              className={`flex items-center gap-1 transition-opacity hover:opacity-100 ${
                selected ? 'opacity-100' : 'opacity-80'
              }`}
            >
              {text}
              {externalLink && (
                <HiOutlineExternalLink className="translate-y-[-0.11rem] text-xl" />
              )}
            </div>
            {selected && (
              <motion.div
                className="opacity-85 absolute top-full left-0 h-1 w-full bg-rust-500"
                layoutId="underline"
              />
            )}
          </div>
        </a>
      </Link>
    </li>
  );
}
