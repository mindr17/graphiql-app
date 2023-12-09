export const firebaseConfig = {
  apiKey:
    process.env.FIREBASE_API_KEY ||
    'AIzaSyBcW9TjeNe51EV4Lg_thjZZZcbw1nhu5k0',

  authDomain:
    process.env.FIREBASE_AUTH_DOMAIN ||
    'apifinder-5a8a8.firebaseapp.com',

  projectId: process.env.FIREBASE_PROJECT_ID || 'apifinder-5a8a8',

  storageBucket:
    process.env.FIREBASE_STORAGE_BUCKET ||
    'apifinder-5a8a8.appspot.com',

  messagingSenderId:
    process.env.FIREBASE_MESSAGING_SENDER_ID || '649290220890',

  appId:
    process.env.FIREBASE_APP_ID ||
    '1:649290220890:web:c53152a45b0381acb91f63',

  measurementId:
    process.env.FIREBASE_MEASUREMENT_ID || 'G-SMQGDCBRF1',
};
