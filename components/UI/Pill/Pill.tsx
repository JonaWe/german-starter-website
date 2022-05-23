import { motion } from 'framer-motion';

interface PillProps {
  name: string;
  className: string;
}

export default function Pill({ name, className }: PillProps) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`${className} rounded-full border uppercase text-xs px-2.5 py-1`}
    >
      {name}
    </motion.span>
  );
}
