import { motion } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi';

interface ArrowButtonProps {
  orientation?: 'left' | 'right';
  onClick?: () => void;
  text: string;
  delay?: number;
}

export default function Avatar({
  orientation = 'right',
  onClick = () => void 0,
  delay = 0,
  text,
}: ArrowButtonProps) {
  return (
    <motion.a
      onClick={onClick}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      transition={{ ease: 'backIn', duration: 1, delay }}
      className={`font-sans text-sm flex items-center cursor-pointer group-hover:text-rust-500 transition-all text-rust-500/80 gap-1`}
    >
      {text}
      <HiArrowRight
        className={`${
          orientation === 'right'
            ? 'group-hover:mr-0 group-hover:ml-3 mr-3'
            : 'group-hover:ml-0 group-hover:mr-3 ml-3'
        } transition-all group-hover:fill-rust-500 fill-rust-500/80`}
      />
    </motion.a>
  );
}
