import { GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';

export const uiConfig = (
  githubAuth: GithubAuthProvider,
  googleAuth: GoogleAuthProvider,
  signInSuccessUrl: string
) => {
  return {
    signInSuccessUrl: '/' + signInSuccessUrl,
    signInOptions: [githubAuth.providerId, googleAuth.providerId],
  };
};
