import { NextPage } from 'next';

import { yupResolver } from '@hookform/resolvers/yup';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import PageContent from '../components/PageContent';
import PageHeader from '../components/PageHeader';
import { uiConfig } from '../config/firebaseAuthUI.config';
import { auth, githubAuth, googleAuth } from '../firebase/clientApp';
import useLocalization from '../hooks/useLocalization';

const schema = yup
  .object({
    password: yup.string().min(6),
    email: yup.string().email(),
  })
  .required();

const SignIn: NextPage = () => {
  const [user] = useAuthState(auth);
  const t = useLocalization();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    signInWithEmailAndPassword(auth, data.email, data.password);
  });

  const authConfig = uiConfig(githubAuth, googleAuth);

  return (
    <>
      <PageHeader imageURL="/assets/images/support_banner.jpg">
        <h1>{t.signIn.title}</h1>
      </PageHeader>
      <PageContent>
        <form
          onSubmit={onSubmit}
          className="text-green-600 bg-background-400 sm:w-96 pb-5 mx-auto"
        >
          <div className="flex p-10 pb-0 flex-col gap-3 justify-center">
            <div className="flex flex-col">
              <label htmlFor="email" className="block mb-1 text-2xl font-bebas">
                {t.signIn.email}
              </label>
              <input
                {...register('email')}
              />
              {errors.email && (
                <div className={`text-red-400 text-xs `}>
                  {errors.email.message}
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="block mb-1 text-2xl font-bebas"
              >
                {t.signIn.pass}
              </label>
              <input
                type="password"
                {...register('password')}
              />
              {errors.password && (
                <div className={`text-red-400 text-xs `}>
                  {errors.password.message}
                </div>
              )}
            </div>
            <button
              type="submit"
              className="font-bebas text-xl py-2 px-4 flex items-center gap-1 text-sand-500 transition duration-150 bg-rust-500 hover:bg-rust-600 w-fit mx-auto"
            >
              {t.signIn.title}
            </button>
          </div>
          <span className="mx-10 h-1 bg-background-500/20 block mt-5"></span>
          <StyledFirebaseAuth uiConfig={authConfig} firebaseAuth={auth} />
        </form>
      </PageContent>
    </>
  );
};

export default SignIn;
