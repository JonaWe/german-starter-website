import { useEffect, useState } from 'react';

import { NextPage } from 'next';
import { useRouter } from 'next/router';

import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { addDoc, collection, doc, serverTimestamp } from 'firebase/firestore';
import { ref } from 'firebase/storage';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import FinalStepButton from '../../components/ReportPlayer/FinalStepButton';
import LastStep from '../../components/ReportPlayer/LastStep';
import LoginStep from '../../components/ReportPlayer/LoginStep';
import SelectPlayer from '../../components/ReportPlayer/SelectPlayer';
import SuccessStep from '../../components/ReportPlayer/SuccessStep';
import FilePicker from '../../components/UI/Forms/FilePicker';
import SimpleListbox from '../../components/UI/Listbox';
import { auth, db, storage } from '../../firebase/clientApp';
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

const variants = {
  hidden: { opacity: 0, x: -200 },
  enter: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 200 },
};

const fetchPlayer = async (steamid: string) => {
  try {
    const data = await axios.post('/api/server/getPlayerById', {
      steamId: steamid,
    });
    return data;
  } catch (err) {
    return null;
  }
};

const PlayerReport: NextPage = () => {
  const [step, setStep] = useState(1);
  const [files, setFiles] = useState<any[]>([]);
  const MAX_FILES = 2;
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
    //Grab params from URL and fill values in
    if (reasonName && reasonId)
      setValue('reason', {
        id: reasonId,
        name: reasonName,
      });

    setValue('description', description);

    if (!playerId) return;
    fetchPlayer(playerId as string).then((data) => {
      const [player] = data?.data.player;

      if (!player) return;

      setValue('player', {
        steamid: player.steamid,
        name: player.name,
      });
    });
  }, [router, playerId, setValue, reasonName, reasonId, description]);

  const onSubmit = handleSubmit(async (data) => {
    if (!user) return nextStep();

    const ticketsRef = collection(db, 'tickets');

    await addDoc(ticketsRef, {
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
              <label className="block my-1 text-sm">
                {t.support.report.media}{' '}
                <span className="text-xs opacity-75">
                  ({files.length + '/' + MAX_FILES})
                </span>
              </label>
              <FilePicker
                accept={{
                  'image/png': ['.png'],
                  'image/jpeg': ['.jpe', '.jpeg', '.jpg'],
                }}
                maxFiles={MAX_FILES}
                files={files}
                onChange={(files) => setFiles(files)}
              />
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
          {step === 2 && !user && (
            <LoginStep
              back={back}
              description={watch('description')}
              playerId={watch('player').steamid}
              reason={watch('reason')}
              type="player-report"
            />
          )}
        </AnimatePresence>
      </form>
    </section>
  );
};

export default PlayerReport;
