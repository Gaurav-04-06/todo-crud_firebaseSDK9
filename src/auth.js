// auth.js
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from './firebase.js';

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, googleProvider)
    .then((result) => {
      const user = result.user;
      console.log('User signed in with Google:', user);
      // Optionally, redirect to a different page
      window.location.href = '/dashboard';
    })
    .catch((error) => {
      console.error('Error signing in with Google:', error.message);
    });
};

export { auth } 
