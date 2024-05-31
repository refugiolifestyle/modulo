import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAce5qzeDtfYBqjsQHnWcZeJTyuVUQqiuA",
  authDomain: "refugio-modulo.firebaseapp.com",
  databaseURL: "https://refugio-modulo-default-rtdb.firebaseio.com",
  projectId: "refugio-modulo",
  storageBucket: "refugio-modulo.appspot.com",
  messagingSenderId: "1053443583364",
  appId: "1:1053443583364:web:1c1b8c3255cfe5de0b01d1"
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