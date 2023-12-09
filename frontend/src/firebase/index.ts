import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

import { firebaseConfig } from '../../configs/firebase';

const app = getApps() ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
