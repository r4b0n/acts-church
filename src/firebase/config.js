import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA2wzPSnzMp_KAMXVmEQixyNdPkVUHiw58",
  authDomain: "acts-church-42bf9.firebaseapp.com",
  projectId: "acts-church-42bf9",
  storageBucket: "acts-church-42bf9.appspot.com",
  messagingSenderId: "45858433111",
  appId: "1:45858433111:web:d8a45cdcd65986ac5c5b12",
  measurementId: "G-KXEWEMQ675",
};

// init firebase
initializeApp(firebaseConfig);

// init services
const db = getFirestore();

export { db };
