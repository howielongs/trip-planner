import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAeGcP_UHpLV4LpZ4JUcFV-OLkQZCF-KW0",
  authDomain: "trip-planner-6ed64.firebaseapp.com",
  projectId: "trip-planner-6ed64",
  storageBucket: "trip-planner-6ed64.firebasestorage.app",
  messagingSenderId: "647470422194",
  appId: "1:647470422194:web:c019983cab1c9ecbd191ab",
  measurementId: "G-LP9HS625WN"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Set up GoogleAuthProvider
const provider = new GoogleAuthProvider();

const googleSignIn = () => {
  return signInWithPopup(auth, provider);
};

const googleSignOut = () => {
  return signOut(auth);
};

export { auth, googleSignIn, googleSignOut };
