import { useState } from 'react';

import { NextPage } from 'next';

import { yupResolver } from '@hookform/resolvers/yup';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { useForm } from 'react-hook-form';
import { MoonLoader } from 'react-spinners';
import * as yup from 'yup';

import PageContent from '../components/PageContent';
import PageHeader from '../components/PageHeader';
import Divider from '../components/UI/Divider';
import Spinner from '../components/UI/Spinner';
import { uiConfig } from '../config/firebaseAuthUI.config';
import { auth, githubAuth, googleAuth } from '../firebase/clientApp';
import useLocalization from '../hooks/useLocalization';
import { AUTH_ERRORS } from '../lib/firebase/errors';

const schema = yup
  .object({
    password: yup
      .string()
      .required()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
        'Must Contain 6 Characters, One Uppercase, One Lowercase and One Number'
      ),
    passwordRepeat: yup
      .string()
      .required('confirm your password')
      .oneOf([yup.ref('password')], 'Passwords do not match'),
    email: yup.string().required().email(),
  })
  .required();

const SignIn: NextPage = () => {
  const [user] = useAuthState(auth);
  const [authError, setAuthError] = useState<string>('');
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
    signInWithEmailAndPassword(auth, data.email, data.password).catch(
      (error) => {
        if (error.message.includes(AUTH_ERRORS.USER_NOT_FOUND))
          setAuthError('User not found!');
        else setAuthError('Ups, something wrong!');
      }
    );
  });

  const authConfig = uiConfig(githubAuth, googleAuth);

  return (
    <>
      <PageContent className="flex items-center h-[90vh]">
        <form
          onSubmit={onSubmit}
          className="text-green-600 bg-background-400 sm:w-96 pb-5 mx-auto"
        >
          <div className="flex p-10 pb-0 flex-col gap-3 justify-center">
            <div className="flex flex-col">
              <label htmlFor="email" className="block mb-1 text-2xl font-bebas">
                {t.signIn.email}
              </label>
              <input {...register('email')} />
              {errors.email && (
                <div className={`text-red-400 text-xs mt-2`}>
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
              <input type="password" {...register('password')} />
              {errors.password && (
                <div className={`text-red-400 text-xs mt-2`}>
                  {errors.password.message}
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="passwordRepeat"
                className="block mb-1 text-2xl font-bebas"
              >
                {t.signIn.passConf}
              </label>
              <input
                type="password"
                id="passwordRepeat"
                {...register('passwordRepeat')}
              />
              {errors.passwordRepeat && (
                <div className={`text-red-400 text-xs mt-2`}>
                  {errors.passwordRepeat.message}
                </div>
              )}
            </div>
            {authError && (
              <div className="bg-red-900 p-4 text-xs">{authError}</div>
            )}
            <button
              type="submit"
              className="font-bebas text-xl py-2 px-4 flex items-center gap-1 text-sand-500 transition duration-150 bg-rust-500 hover:bg-rust-600 w-fit mx-auto"
            >
              {t.signIn.signUp}
              {/* <Spinner className="fill-sand-600 text-white" /> */}
            </button>
          </div>
          <Divider className="mt-5 " />
          <StyledFirebaseAuth uiConfig={authConfig} firebaseAuth={auth} />
        </form>
      </PageContent>
    </>
  );
};

export default SignIn;
