import Link from 'next/link';

import { motion } from 'framer-motion';

interface NewsNavItemProps {
  isActive: boolean;
  id: string;
  setCurrent: (id: string) => void;
  releaseDate: string;
  title: string;
}

export function NewsNavItem({
  isActive,
  id,
  setCurrent,
  releaseDate,
  title,
}: NewsNavItemProps) {
  return (
    <li key={id} className="relative h-10">
      {isActive && (
        <motion.div
          className="h-full w-[2px] bg-rust-500 z-10 absolute -left-3"
          layoutId="underline"
        />
      )}
      <Link href={`/news#${id}`}>
        <a onClick={() => setCurrent(id)} className="">
          <h4
            className={`group-hover:text-sand-500 transition-colors text-2xl leading-none`}
          >
            {title}
          </h4>
          <p className="text-xs text-sand-500/60">{releaseDate}</p>
        </a>
      </Link>
    </li>
  );
}
