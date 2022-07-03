import { motion, useTransform, useViewportScroll } from 'framer-motion';
import CountUp from 'react-countup';

import useScrollDistance from '../../hooks/useScrollDistance';

export type Format = 'compact' | 'standard';

export default function SocialProofItem({
  value,
  name,
  format = 'compact',
}: {
  value: number;
  format?: 'standard' | 'compact';
  name: string;
}) {
  const formatter = Intl.NumberFormat('en', { notation: format });

  const { scrollYProgress } = useViewportScroll();

  const opacity = useTransform(scrollYProgress, [0, 0.1], [0.3, 1]);

  return (
    <motion.div style={{ opacity }} className="text-center">
      <div className="opacity-80 hover:opacity-100 transition-all duration-500">
        <h1 className="md:text-9xl -mb-2 md:-mb-4 text-5xl">
          {formatter.format(value)}
        </h1>
        <p className="text-xs md:text-base opacity-50">{name}</p>
      </div>
    </motion.div>
  );
}
