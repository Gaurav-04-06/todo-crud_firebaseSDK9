import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCYQm6KAZhT65pxJPsVHUYAuEP_-9DxIYk",
  authDomain: "todo-app-5f7d8.firebaseapp.com",
  projectId: "todo-app-5f7d8",
  storageBucket: "todo-app-5f7d8.firebasestorage.app",
  messagingSenderId: "192045572165",
  appId: "1:192045572165:web:e33cca803cba18060e032c",
  measurementId: "G-3NHQ83X5JY"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
