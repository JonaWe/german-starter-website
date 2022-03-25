import { NextPage } from 'next';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { auth, githubAuth, googleAuth } from '../firebase/clientApp';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import PageHeader from '../components/PageHeader';
import PageContent from '../components/PageContent';
import useLocalization from '../hooks/useLocalization';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { uiConfig } from '../config/firebaseAuthUI.config';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const schema = yup
  .object({
    password: yup.string(),
    passwordRepeat: yup.string(),
    email: yup.string(),
  })
  .required();

const SignUp: NextPage = () => {
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
    createUserWithEmailAndPassword(auth, data.email, data.password);
  });

  const authConfig = uiConfig(githubAuth, googleAuth);

  return (
    <>
      <PageHeader imageURL="/assets/images/support_banner.jpg">
        <h1>{t.supportPage.title}</h1>
      </PageHeader>
      <PageContent>
        <form onSubmit={onSubmit} className="text-green-600">
          <input
            defaultValue="test"
            type="password"
            {...register('password')}
          />
          <input
            defaultValue="test"
            type="password"
            {...register('passwordRepeat')}
          />
          <input defaultValue="test" {...register('email')} />
          <button type="submit">submit</button>
        </form>
        <StyledFirebaseAuth uiConfig={authConfig} firebaseAuth={auth} />
      </PageContent>
    </>
  );
};

export default SignUp;
