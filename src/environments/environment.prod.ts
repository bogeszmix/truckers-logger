import * as firebaseConf from 'firebase-conf.json';

export const environment = {
  production: true,
  firebaseConfig: {
    apiKey: firebaseConf.apiKey,
    authDomain: firebaseConf.authDomain,
    databaseURL: firebaseConf.databaseURL,
    projectId: firebaseConf.projectId,
    storageBucket: firebaseConf.storageBucket,
    messagingSenderId: firebaseConf.messagingSenderId,
    appId: firebaseConf.appId
  }
};
