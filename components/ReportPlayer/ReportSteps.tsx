import { useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import useLocalization from '../../hooks/useLocalization';
import SimpleListbox from '../UI/Listbox';
import { Player } from './Interfaces/Player';
import LastStep from './LastStep';
import NextStep from './NextStep';
import ReportStep from './ReportStep';
import SelectPlayer from './SelectPlayer';

export default function ReportSteps({}) {
  const [step, setStep] = useState(1);
  const t = useLocalization();
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>();
  const [selectedType, setSelectedType] = useState(t.support.report.types[0]);

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
    <section className="h-screen">
      <AnimatePresence exitBeforeEnter initial={false}>
        {step === 1 && (
          <motion.div
            variants={variants} // Pass the variant object into Framer Motion
            initial="hidden" // Set the initial state to variants.hidden
            animate="enter" // Animated state to variants.enter
            exit="exit" // Exit state (used later) to variants.exit
            transition={{ type: 'linear' }}
            key="step1"
            className="p-10 w-96 flex flex-col"
          >
            <h2 className="mb-2">{t.support.report.typeHeader}</h2>
            <SimpleListbox
              options={t.support.report.types}
              setSelected={setSelectedType}
              selected={selectedType}
            />
            <NextStep onClick={nextStep} className="self-end mt-2" />
          </motion.div>
        )}
        {step === 2 && selectedType.id === 'FEEDBACK' && (
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
            <label className="block mb-1 text-lg font-bebas">
              Beschimpfungen
            </label>
            <textarea rows={5}></textarea>
            <div className="flex justify-between items-center">
              <LastStep onClick={back} className="self-end mt-2" />
              <NextStep onClick={nextStep} className="self-end mt-2" />
            </div>
          </motion.div>
        )}
        {step === 2 && selectedType.id === 'PLAYER_REPORT' && (
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
            <label className="block mb-1 text-lg font-bebas">
              Beschimpfungen
            </label>
            <SelectPlayer
              selected={selectedPlayer}
              setSelected={setSelectedPlayer}
            />
            <label className="block mb-1 text-lg font-bebas">
              Beschimpfungen
            </label>
            <textarea rows={5}></textarea>
            <div className="flex justify-between items-center">
              <LastStep onClick={back} className="self-end mt-2" />
              <NextStep onClick={nextStep} className="self-end mt-2" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
