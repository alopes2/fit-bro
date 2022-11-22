import admin from 'firebase-admin';

const serviceAccountJson = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT!) as admin.ServiceAccount;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountJson)
});

export const firestore = admin.firestore();
