import { useState } from 'react';

import { NextPage } from 'next';
import Router, { useRouter } from 'next/router';

import { AnimatePresence, motion } from 'framer-motion';
import { useAuthState } from 'react-firebase-hooks/auth';
import { HiCheckCircle } from 'react-icons/hi';

import { Player } from '../../components/ReportPlayer/Interfaces/Player';
import LastStep from '../../components/ReportPlayer/LastStep';
import LoginStep from '../../components/ReportPlayer/LoginStep';
import NextStep from '../../components/ReportPlayer/NextStep';
import SelectPlayer from '../../components/ReportPlayer/SelectPlayer';
import SuccessStep from '../../components/ReportPlayer/SuccessStep';
import Button from '../../components/UI/Button';
import SimpleListbox from '../../components/UI/Listbox';
import { auth } from '../../firebase/clientApp';
import useLocalization from '../../hooks/useLocalization';

const Feedback: NextPage = () => {
  const [step, setStep] = useState(1);
  const t = useLocalization();
  const [user] = useAuthState(auth);
  const [selectedType, setSelectedType] = useState(t.support.report.types[0]);

  const router = useRouter();

  const variants = {
    hidden: { opacity: 0, x: -200 },
    enter: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 200 },
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const back = () => {
    setStep(step - 1);
  };

  return (
    <section className="h-screen flex justify-center items-center">
      <AnimatePresence exitBeforeEnter initial={false}>
        {step === 1 &&
          (selectedType.id === 'FEEDBACK' || selectedType.id === 'BUG') && (
            <motion.div
              variants={variants} // Pass the variant object into Framer Motion
              initial="hidden" // Set the initial state to variants.hidden
              animate="enter" // Animated state to variants.enter
              exit="exit" // Exit state (used later) to variants.exit
              transition={{ type: 'linear' }}
              id="step1"
              className="p-10 w-96 flex flex-col"
              key="step2"
            >
              <h2 className="mb-2">{t.support.report.feedbackHeader}</h2>
              <label className="block my-1 text-sm">
                {t.from.general.description}
              </label>
              <textarea rows={5} />
              <div className="flex justify-between items-center">
                <LastStep
                  onClick={() => router.push('/support')}
                  name={t.support.report.new}
                  className="self-end mt-2"
                />
                <NextStep onClick={nextStep} className="mt-2" />
              </div>
            </motion.div>
          )}
        {/*Success with user signd in */}
        {step === 2 && user && <SuccessStep back={back} />}
        {/* No user on step 3 */}
        {step === 2 && !user && (
          <LoginStep
            back={back}
            playerId={''}
            description={''}
            type={''}
            reason={{
              id: '',
              name: '',
            }}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Feedback;
