import { MouseEventHandler } from 'react';

import Link from 'next/link';

import { motion } from 'framer-motion';

import useButtonStyle from '../../../hooks/useButtonStyle';

interface AvatarProps {
  className?: string;
  url: string | null;
}

export default function Avatar({ className, url }: AvatarProps) {
  return (
    <div
      className={`aspect-square overflow-hidden bg-background-500 relative ${
        className ? className : ''
      }`}
    >
      {url && (
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          src={url}
          alt="avatar"
          className="object-fit relative z-10"
        />
      )}
      <span className="absolute inset-0 bg-background-700 animate-pulse z-[5]" />
    </div>
  );
}
