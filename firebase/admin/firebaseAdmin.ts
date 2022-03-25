import { App, getApp, getApps, initializeApp } from 'firebase-admin/app';
import { credential } from 'firebase-admin';

let admin: App 

try { 
  admin = getApp('admin')
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
  )
}

export { admin };
