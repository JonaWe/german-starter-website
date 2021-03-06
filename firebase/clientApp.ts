import { getApp, getApps, initializeApp } from 'firebase/app';
import { GithubAuthProvider, GoogleAuthProvider, getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

import { firebaseConfig } from '../config/firebaseClient.config';

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const githubAuth = new GithubAuthProvider();
const googleAuth = new GoogleAuthProvider();

export { db, auth, storage, githubAuth, googleAuth };
