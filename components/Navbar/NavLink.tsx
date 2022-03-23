import { motion } from 'framer-motion';
import Link from 'next/link';
import { HiOutlineExternalLink } from 'react-icons/hi';

interface NavLinkProps {
  href: string;
  text: string;
  externalLink?: boolean;
  selected?: boolean;
  onClick(): void;
}
export default function NavLink({
  href,
  text,
  externalLink,
  selected,
  onClick,
}: NavLinkProps) {
  return (
    <li>
      <Link href={href}>
        <a
          className="font-bebas text-2xl lg:text-3xl [text-shadow:0_4px_8px_rgba(0,0,0,0.12)]"
          onClick={onClick}
        >
          <div className="relative w-fit">
            <div
              className={`flex items-center gap-1 transition-opacity hover:opacity-100 ${
                selected ? 'opacity-100' : 'opacity-80'
              }`}
            >
              {text}
              {externalLink && (
                <HiOutlineExternalLink className="text-xl translate-y-[-0.11rem]" />
              )}
            </div>
            {selected && (
              <motion.div
                className="absolute bg-rust-500 opacity-85 top-full left-0 w-full h-1"
                layoutId="underline"
              />
            )}
          </div>
        </a>
      </Link>
    </li>
  );
}
