import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDEu_-nRG99-IhhOmQQ94jXXz5hjnPsqcc",
  authDomain: "refugio-89c1e.firebaseapp.com",
  databaseURL: "https://refugio-89c1e-default-rtdb.firebaseio.com",
  projectId: "refugio-89c1e",
  storageBucket: "refugio-89c1e.appspot.com",
  messagingSenderId: "948076519503",
  appId: "1:948076519503:web:16f6156678d0fb5bbcca3a",
  measurementId: "G-DLJJ5VJT0H"
};

const firebaseConfigTeste = {
  apiKey: "AIzaSyCubXIEtjg0zndG5kEHvRFJoOK9S5Cct48",
  authDomain: "retiro-teste.firebaseapp.com",
  databaseURL: "https://retiro-teste-default-rtdb.firebaseio.com",
  projectId: "retiro-teste",
  storageBucket: "retiro-teste.appspot.com",
  messagingSenderId: "693062890363",
  appId: "1:693062890363:web:1f672f47092a049b64c3de"
};

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseDatabase = getDatabase(firebaseApp);
export const firebaseStorage = getStorage(firebaseApp);
export const firebaseAuth = getAuth(firebaseApp);
firebaseAuth.languageCode = 'pt';