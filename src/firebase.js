// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; 
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDt3MRLARfNf1LNzZupKO2BZGbJgw_SewE",
    authDomain: "netflix-clone-c0154.firebaseapp.com",
    projectId: "netflix-clone-c0154",
    storageBucket: "netflix-clone-c0154.appspot.com",
    messagingSenderId: "894566671406",
    appId: "1:894566671406:web:049e97edc04b8fd0a52bbf",
    measurementId: "G-G7DD87S37P"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig)

  const db = firebaseApp.firestore()
  const auth = firebaseApp.auth()
  
  export { db, auth };