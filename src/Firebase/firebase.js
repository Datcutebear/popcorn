import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyCMEc2Tu1Q6TeT6fjocWOFbQWMtl7GY-eU",
    authDomain: "singin-7dd4c.firebaseapp.com",
    projectId: "singin-7dd4c",
    storageBucket: "singin-7dd4c.appspot.com",
    messagingSenderId: "492068247371",
    appId: "1:492068247371:web:a6097d3b920e4944b83ace"
  };
  
  // Initialize Firebase
  export const db=firebase.initializeApp(firebaseConfig)
  export const uiConfig = {
   // Popup signin flow rather than redirect flow.
   signInFlow: 'popup',
   // We will display Google and Facebook as auth providers.
   signInOptions: [
     firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    
   ],
   callbacks: {
     // Avoid redirects after sign-in.
     signInSuccessWithAuthResult: () => false,
   }, 
 };
  export default firebase
