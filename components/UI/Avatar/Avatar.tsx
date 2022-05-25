import { motion } from 'framer-motion';

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
          className="object-cover relative z-10 w-full h-full"
        />
      )}
      <span className="absolute inset-0 bg-background-700 animate-pulse z-[5]" />
    </div>
  );
}
