import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth"
import { getFirestore } from "@firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyBt-zvtEhZonXrTY6uCbahpIWw61-ThHUU",
//   authDomain: "backend-bdcc3.firebaseapp.com",
//   projectId: "backend-bdcc3",
//   storageBucket: "backend-bdcc3.appspot.com",
//   messagingSenderId: "808415706112",
//   appId: "1:808415706112:web:b09cbccfdd5067d6372ce5"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

const firebaseConfig = {
  apiKey: "AIzaSyBTNQJrJnQf9c9Vp4j2n9p-lHzBPoIo90c",
  authDomain: "fb-backend-46b37.firebaseapp.com",
  projectId: "fb-backend-46b37",
  storageBucket: "fb-backend-46b37.appspot.com",
  messagingSenderId: "94833346653",
  appId: "1:94833346653:web:44270c47e56bb9ecbae5b4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const db = getFirestore(app);