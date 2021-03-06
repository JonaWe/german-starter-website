import { credential } from 'firebase-admin';
import { App, getApp, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { FirebaseApp } from 'firebase/app';

let admin: App;

try {
  admin = getApp('admin');
} catch (e) {
  console.log((e as Error).message, getApps());
  admin = initializeApp(
    {
      credential: credential.cert({
        privateKey: process.env.PRIVATE_KEY,
        clientEmail: process.env.CLIENT_EMAIL,
        projectId: process.env.PROJECT_ID,
      }),
    },
    'admin'
  );
}

const auth = getAuth(admin as FirebaseApp);
const db = getFirestore(admin);

export { admin, auth, db };
