import { GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';
export const uiConfig = (
  githubAuth: GithubAuthProvider,
  googleAuth: GoogleAuthProvider
) => {
  return {
    signInSuccessUrl: '/app',
    signInOptions: [githubAuth.providerId, googleAuth.providerId],
  };
};
