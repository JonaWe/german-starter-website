import { useState } from 'react';

import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { yupResolver } from '@hookform/resolvers/yup';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import PageContent from '../components/PageContent';
import Divider from '../components/UI/Divider';
import InfoBox from '../components/UI/Info';
import Spinner from '../components/UI/Spinner';
import { uiConfig } from '../config/firebaseAuthUI.config';
import { auth, githubAuth, googleAuth } from '../firebase/clientApp';
import useLocalization from '../hooks/useLocalization';
import { AUTH_ERRORS } from '../lib/firebase/errors';

const schema = yup
  .object({
    password: yup.string().required().min(6),
    email: yup.string().required().email(),
  })
  .required();

const SignIn: NextPage = () => {
  const [user] = useAuthState(auth);
  const [authError, setAuthError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const t = useLocalization();

  const router = useRouter();

  const returnParams = Object.keys(router.query)
    .map((key) => key + '=' + router.query[key])
    .join('&');

  const successUrl = router.query.successUrl + '?' + returnParams;

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
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        if (successUrl) router.push('/' + successUrl);
        else router.push('/');
      })
      .catch((error) => {
        if (error.message.includes(AUTH_ERRORS.USER_NOT_FOUND))
          setAuthError('User not found!');
        else if (error.message.includes(AUTH_ERRORS.INVALID_PASSWORD))
          setAuthError('Invalid password!');
        else setAuthError('Ups, something wrong!');
      });
  });

  const authConfig = uiConfig(
    githubAuth,
    googleAuth,
    successUrl ? successUrl.toString() : ''
  );

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
            {authError && (
              <InfoBox type="error" className="mt-4" info={authError} />
            )}
            <button
              type="submit"
              disabled={loading}
              className="font-bebas text-xl py-2 px-4 flex items-center gap-1 text-sand-500 transition duration-150 bg-rust-500 hover:bg-rust-600 w-fit mx-auto"
            >
              {t.signIn.title}
              {loading && <Spinner className="fill-sand-600 text-white" />}
            </button>
            <Link href="/signup">
              <a className="text-rust-500/80 hover:text-rust-500 underline text-center transition-colors">
                {t.from.general.noAccount}
              </a>
            </Link>
          </div>
          <Divider className="mt-5 " />
          <StyledFirebaseAuth uiConfig={authConfig} firebaseAuth={auth} />
        </form>
      </PageContent>
    </>
  );
};

export default SignIn;
