import { getAuth, GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { firebaseConfig } from '../config/firebaseClient.config';
import { getFirestore } from 'firebase/firestore';

const app = getApps().length === 0 ? initializeApp(firebaseConfig, 'clientApp') : getApp('clientApp');
const auth = getAuth(app);
const db = getFirestore(app);

const githubAuth = new GithubAuthProvider();
const googleAuth = new GoogleAuthProvider();

export { db, auth, githubAuth, googleAuth };
