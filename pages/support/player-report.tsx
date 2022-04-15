import { useState } from 'react';

import { NextPage } from 'next';
import Router, { useRouter } from 'next/router';

import { yupResolver } from '@hookform/resolvers/yup';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { HiCheckCircle } from 'react-icons/hi';
import * as yup from 'yup';

import FinalStepButton from '../../components/ReportPlayer/FinalStepButton';
import { Player } from '../../components/ReportPlayer/Interfaces/Player';
import LastStep from '../../components/ReportPlayer/LastStep';
import LoginStep from '../../components/ReportPlayer/LoginStep';
import SelectPlayer from '../../components/ReportPlayer/SelectPlayer';
import SuccessStep from '../../components/ReportPlayer/SuccessStep';
import SimpleListbox from '../../components/UI/Listbox';
import { auth, db } from '../../firebase/clientApp';
import useLocalization from '../../hooks/useLocalization';

const schema = yup
  .object({
    player: yup.object({
      steamid: yup.string().required(),
      name: yup.string().required(),
    }),
    reason: yup.object({
      id: yup.string(),
      name: yup.string(),
    }),
    description: yup
      .string()
      .required('describe your incident')
      .min(3)
      .max(200),
  })
  .required();

const PlayerReport: NextPage = () => {
  const [step, setStep] = useState(1);
  const t = useLocalization();
  const [user] = useAuthState(auth);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

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

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);

    if (!user) return;

    const ticketsRef = collection(db, 'tickets');

    const doc = await addDoc(ticketsRef, {
      author: user.uid,
      reportedPlayer: data.player.steamid,
      reason: data.reason.id || t.support.report.player.reasons[0],
      description: data.description,
      createdAt: serverTimestamp(),
      type: 'PLAYER_REPORT',
    });

    nextStep();
  });

  return (
    <section className="h-screen flex justify-center items-center">
      <form onSubmit={onSubmit}>
        <AnimatePresence exitBeforeEnter initial={false}>
          {step === 1 && (
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
                {t.support.report.player.selection}
              </label>
              <div className="z-10">
                <SelectPlayer
                  selected={watch('player')}
                  setSelected={(value) => setValue('player', value)}
                />
              </div>
              {errors.player && (
                <div className={`text-red-500 text-xs`}>
                  {'Select a player'}
                </div>
              )}
              <label className="block my-1 text-sm">
                {t.support.report.player.reason}
              </label>
              <SimpleListbox
                options={t.support.report.player.reasons}
                setSelected={(value) => setValue('reason', value)}
                selected={watch('reason') || t.support.report.player.reasons[0]}
              />
              <label className="block my-1 text-sm">
                {t.from.general.description}
              </label>
              <textarea rows={5} {...register('description')}></textarea>
              {errors.description && (
                <div className={`text-red-500 text-xs mt-2`}>
                  {errors.description.message}
                </div>
              )}
              <div className="flex justify-between items-center">
                <LastStep
                  onClick={() => router.push('/support')}
                  name={t.support.report.new}
                  className="self-end mt-2"
                />
                <FinalStepButton className="self-end mt-2" />
              </div>
            </motion.div>
          )}
          {/*Success with user signed in */}
          {step === 2 && user && <SuccessStep back={back} />}
          {/* No user on step 3 */}
          {step === 2 && !user && <LoginStep back={back} />}
        </AnimatePresence>
      </form>
    </section>
  );
};

export default PlayerReport;
