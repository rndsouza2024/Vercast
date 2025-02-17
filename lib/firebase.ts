// // lib/firebase.ts
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";

// // Your Firebase configuration (replace with actual values)
// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
// };

// const firebaseApp = initializeApp(firebaseConfig);

// // Get the Firebase Authentication instance
// const auth = getAuth(firebaseApp);

// export { firebaseApp, auth };


// firebase.js or firebaseConfig.js



// // lib/firebase.ts

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // If you're using Firebase Authentication

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDoP6XIZkUwNf7dPc9lSrW8gA0TkVzkiB8",
  authDomain: "doogel-d35cc.firebaseapp.com", // This should be your Auth Domain
  projectId: "doogel-d35cc",
  storageBucket: "doogel-d35cc.firebasestorage.app",
  messagingSenderId: "371545070379",
  appId: "1:371545070379:web:35b00cfa255ec3aa7c836e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase Auth (if you're using authentication)
export const auth = getAuth(app);
