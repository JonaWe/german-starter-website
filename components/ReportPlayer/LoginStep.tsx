import { motion } from 'framer-motion';

import useLocalization from '../../hooks/useLocalization';
import Button from '../UI/Button';
import LastStep from './LastStep';

const variants = {
  hidden: { opacity: 0, x: -200 },
  enter: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 200 },
};

export default function LoginStep({ back }: { back: () => void }) {
  const t = useLocalization();
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
      <h2 className="mb-2">{t.support.report.completeHeader}</h2>
      <div className="flex items-center justify-center flex-col bg-background-150 p-3 gap-1">
        <p className="text-sm text-center mb-3">{t.support.report.complete}</p>
        <div className="flex gap-5">
          <Button
            text={t.signIn.title}
            primary
            useLink
            href="/signin?successUrl=support"
          />
          <Button
            text={t.signIn.signUp}
            useLink
            href="/signin?successUrl=support"
          />
        </div>
      </div>
      <LastStep onClick={back} className="self-end mt-2 mr-auto" />
    </motion.div>
  );
}
