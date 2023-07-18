import admin from "firebase-admin";
import config from "../../config/index";

const serviceAccount = require('../../config/firebaseAdminPrivateKey.json')

const { databaseURL } = config.get('firebaseAdminSdk');

export const fireConnect = async () => {
  await admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: databaseURL,
  });
}



