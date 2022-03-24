import { App, initializeApp } from 'firebase-admin/app';
import { credential } from 'firebase-admin';
import { getApp } from 'firebase/app';

let admin: App;

try {
  admin = initializeApp(
    {
      credential: credential.cert({
        privateKey: process.env.PRIVATE_KEY,
        clientEmail: process.env.CLIENT_EMAIL,
        projectId: process.env.PROJECT_ID,
      }),
    },
    'serviceApp'
  );
} catch (error) {
  if (!/already exists/u.test((error as Error).message))
    admin = getApp('serviceApp');
}

export { admin };
