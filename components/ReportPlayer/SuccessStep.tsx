import { useRouter } from 'next/router';

import { motion } from 'framer-motion';
import { HiCheckCircle } from 'react-icons/hi';

import useLocalization from '../../hooks/useLocalization';
import Button from '../UI/Button';
import LastStep from './LastStep';
import NextStep from './NextStep';

const variants = {
  hidden: { opacity: 0, x: -200 },
  enter: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 200 },
};

export default function SuccessStep({ back }: { back: () => void }) {
  const t = useLocalization();
  const router = useRouter();
  return (
    <motion.div
      variants={variants} // Pass the variant object into Framer Motion
      initial="hidden" // Set the initial state to variants.hidden
      animate="enter" // Animated state to variants.enter
      exit="exit" // Exit state (used later) to variants.exit
      transition={{ type: 'linear' }}
      id="step3"
      className="p-10 w-96 flex flex-col"
      key="step3"
    >
      <h2 className="mb-2">{t.support.report.thanksHeader}</h2>
      <div className="flex items-center justify-center flex-col bg-background-150 p-3 gap-1 min-h-[14rem]">
        <HiCheckCircle className="fill-green-600 text-3xl" />
        <p className="text-sm">{t.support.report.thanks}</p>
      </div>
      <div className="flex justify-end items-center">
        <NextStep
          onClick={() => router.push('/support')}
          name={t.support.report.new}
          className="self-end mt-2"
        />
      </div>
    </motion.div>
  );
}
