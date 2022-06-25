import { useEffect, useState } from 'react';

import { NextPage } from 'next';
import { useRouter } from 'next/router';

import { yupResolver } from '@hookform/resolvers/yup';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import LastStep from '../../components/ReportPlayer/LastStep';
import LoginStep from '../../components/ReportPlayer/LoginStep';
import NextStep from '../../components/ReportPlayer/NextStep';
import SuccessStep from '../../components/ReportPlayer/SuccessStep';
import { auth, db } from '../../firebase/clientApp';
import useLocalization from '../../hooks/useLocalization';
import FinalStepButton from '../../components/ReportPlayer/FinalStepButton';

const schema = yup
  .object({
    description: yup
      .string()
      .required('describe your incident')
      .min(3)
      .max(200),
  })
  .required();

const variants = {
  hidden: { opacity: 0, x: -200 },
  enter: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 200 },
};

const Feedback: NextPage = () => {
  const [step, setStep] = useState(1);
  const t = useLocalization();
  const [user] = useAuthState(auth);

  const router = useRouter();
  const { playerId, description, reasonId, reasonName } = router.query;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const nextStep = () => {
    setStep(step + 1);
  };

  const back = () => {
    setStep(step - 1);
  };

  useEffect(() => {
    setValue('description', description);
  }, [setValue, description]);

  const onSubmit = handleSubmit(async (data) => {
    if (!user) return nextStep();

    const ticketsRef = collection(db, 'tickets');

    await addDoc(ticketsRef, {
      author: user.uid,
      description: data.description,
      createdAt: serverTimestamp(),
      type: 'FEEDBACK',
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
                {t.from.general.description}
              </label>
              <textarea rows={5} {...register('description')} />
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
          {/*Success with user signd in */}
          {step === 2 && user && <SuccessStep back={back} />}
          {/* No user on step 3 */}
          {step === 2 && !user && (
            <LoginStep
              back={back}
              description={watch('description')}
              type={'FEEDBACK'}
              reason={{
                id: '',
                name: '',
              }}
            />
          )}
        </AnimatePresence>
      </form>
    </section>
  );
};

export default Feedback;
