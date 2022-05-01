import { useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { useAuthState } from 'react-firebase-hooks/auth';
import { HiCheckCircle } from 'react-icons/hi';

import { auth } from '../../firebase/clientApp';
import useLocalization from '../../hooks/useLocalization';
import Button from '../UI/Button';
import SimpleListbox from '../UI/Listbox';
import { Player } from './Interfaces/Player';
import LastStep from './LastStep';
import NextStep from './NextStep';
import SelectPlayer from './SelectPlayer';

export default function ReportSteps({}) {
  const [step, setStep] = useState(1);
  const t = useLocalization();
  const [user] = useAuthState(auth);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>();
  const [selectedType, setSelectedType] = useState(t.support.report.types[0]);
  const [selectedReason, setSelectedReason] = useState(
    t.support.report.player.reasons[0]
  );

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

  // return (
  //   <section className="h-screen">
  //     <AnimatePresence exitBeforeEnter initial={false}>
  //       {step === 1 && (
  //         <motion.div
  //           variants={variants} // Pass the variant object into Framer Motion
  //           initial="hidden" // Set the initial state to variants.hidden
  //           animate="enter" // Animated state to variants.enter
  //           exit="exit" // Exit state (used later) to variants.exit
  //           transition={{ type: 'linear' }}
  //           key="step1"
  //           className="p-10 w-96 flex flex-col"
  //         >
  //           <h2 className="mb-2">{t.support.report.typeHeader}</h2>
  //           <SimpleListbox
  //             options={t.support.report.types}
  //             setSelected={setSelectedType}
  //             selected={selectedType}
  //           />
  //           <NextStep onClick={nextStep} className="self-end mt-2" />
  //         </motion.div>
  //       )}
  //       {step === 2 &&
  //         (selectedType.id === 'FEEDBACK' || selectedType.id === 'BUG') && (
  //           <motion.div
  //             variants={variants} // Pass the variant object into Framer Motion
  //             initial="hidden" // Set the initial state to variants.hidden
  //             animate="enter" // Animated state to variants.enter
  //             exit="exit" // Exit state (used later) to variants.exit
  //             transition={{ type: 'linear' }}
  //             id="step1"
  //             className="p-10 w-96 flex flex-col"
  //             key="step2"
  //           >
  //             <h2 className="mb-2">{t.support.report.feedbackHeader}</h2>
  //             <label className="block my-1 text-sm">
  //               {t.from.general.description}
  //             </label>
  //             <textarea rows={5}></textarea>
  //             <div className="flex justify-between items-center">
  //               <LastStep onClick={back} className="self-end mt-2" />
  //               <NextStep onClick={nextStep} className="self-end mt-2" />
  //             </div>
  //           </motion.div>
  //         )}
  //       {step === 2 && selectedType.id === 'PLAYER_REPORT' && (
  //         <motion.div
  //           variants={variants} // Pass the variant object into Framer Motion
  //           initial="hidden" // Set the initial state to variants.hidden
  //           animate="enter" // Animated state to variants.enter
  //           exit="exit" // Exit state (used later) to variants.exit
  //           transition={{ type: 'linear' }}
  //           id="step1"
  //           className="p-10 w-96 flex flex-col"
  //           key="step2"
  //         >
  //           <h2 className="mb-2">{t.support.report.feedbackHeader}</h2>
  //           <label className="block my-1 text-sm">
  //             {t.support.report.player.selection}
  //           </label>
  //           <div className="z-10">
  //             <SelectPlayer
  //               selected={selectedPlayer}
  //               setSelected={setSelectedPlayer}
  //             />
  //           </div>
  //           <label className="block my-1 text-sm">
  //             {t.support.report.player.reason}
  //           </label>
  //           <SimpleListbox
  //             options={t.support.report.player.reasons}
  //             setSelected={setSelectedReason}
  //             selected={selectedReason}
  //           />
  //           <label className="block my-1 text-sm">
  //             {t.from.general.description}
  //           </label>
  //           <textarea rows={5}></textarea>
  //           <div className="flex justify-between items-center">
  //             <LastStep onClick={back} className="self-end mt-2" />
  //             <NextStep onClick={nextStep} className="self-end mt-2" />
  //           </div>
  //         </motion.div>
  //       )}
  //       {/*Success with user signd in */}
  //       {step === 3 && user && (
  //         <motion.div
  //           variants={variants} // Pass the variant object into Framer Motion
  //           initial="hidden" // Set the initial state to variants.hidden
  //           animate="enter" // Animated state to variants.enter
  //           exit="exit" // Exit state (used later) to variants.exit
  //           transition={{ type: 'linear' }}
  //           id="step3"
  //           className="p-10 w-96 flex flex-col"
  //           key="step3"
  //         >
  //           <h2 className="mb-2">{t.support.report.thanksHeader}</h2>
  //           <div className="flex items-center justify-center flex-col bg-background-150 p-3 gap-1">
  //             <HiCheckCircle className="fill-green-600 text-3xl" />
  //             <p className="text-sm">{t.support.report.thanks}</p>
  //           </div>
  //           <div className="flex justify-between items-center">
  //             <LastStep onClick={back} className="self-end mt-2" />
  //             <NextStep
  //               onClick={() => setStep(1)}
  //               name={t.support.report.new}
  //               className="self-end mt-2"
  //             />
  //           </div>
  //         </motion.div>
  //       )}
  //       {/* No user on step 3 */}
  //       {step === 3 && !user && (
  //         <motion.div
  //           variants={variants} // Pass the variant object into Framer Motion
  //           initial="hidden" // Set the initial state to variants.hidden
  //           animate="enter" // Animated state to variants.enter
  //           exit="exit" // Exit state (used later) to variants.exit
  //           transition={{ type: 'linear' }}
  //           id="step3"
  //           className="p-10 w-96 flex flex-col"
  //           key="step3"
  //         >
  //           <h2 className="mb-2">{t.support.report.completeHeader}</h2>
  //           <div className="flex items-center justify-center flex-col bg-background-150 p-3 gap-1">
  //             <p className="text-sm text-center mb-3">
  //               {t.support.report.complete}
  //             </p>
  //             <div className="flex gap-5">
  //               <Button
  //                 text={t.signIn.title}
  //                 primary
  //                 useLink
  //                 href="/signin?successUrl=support"
  //               />
  //               <Button
  //                 text={t.signIn.signUp}
  //                 useLink
  //                 href="/signin?successUrl=support"
  //               />
  //             </div>
  //           </div>
  //           <LastStep onClick={back} className="self-end mt-2 mr-auto" />
  //         </motion.div>
  //       )}
  //     </AnimatePresence>
  //   </section>
  // );
}
