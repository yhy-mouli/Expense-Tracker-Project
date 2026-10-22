// Import the functions you need from the SDKs you need
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAewOegjVU2GrspS7Ohj7atzDP9jirXRQg",
  authDomain: "expense-tracker-10819.firebaseapp.com",
  projectId: "expense-tracker-10819",
  storageBucket: "expense-tracker-10819.firebasestorage.app",
  messagingSenderId: "947804999322",
  appId: "1:947804999322:web:c853427c65206e8c2cd923"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Initialize Auth
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

// db
export const fireStore = getFirestore(app);