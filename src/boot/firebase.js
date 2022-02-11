import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// import { getAuth } from "firebase/auth";
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyDu9n_FeVFNsnQjbp43qvy4byHo369N-18",
  authDomain: "staff-portal-52c56.firebaseapp.com",
  projectId: "staff-portal-52c56",
  storageBucket: "staff-portal-52c56.appspot.com",
  messagingSenderId: "456257010797",
  appId: "1:456257010797:web:9242eac7debc0ef5fa9364",
  measurementId: "G-51X3TG5KGH"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const auth = getAuth(app);

export default db