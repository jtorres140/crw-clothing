import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
    apiKey: "AIzaSyA1hU7PULOgO5uN65gq7itoVfOXewqxyz8",
    authDomain: "crwn-db-b7b9a.firebaseapp.com",
    projectId: "crwn-db-b7b9a",
    storageBucket: "crwn-db-b7b9a.appspot.com",
    messagingSenderId: "873059894763",
    appId: "1:873059894763:web:d292299cb1cd786fac85ae",
    measurementId: "G-FTZF87WM5B"
  }

  firebase.initializeApp(config);

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    
    const userRef = firestore.doc(`users/${userAuth.uid}`);
  
    const snapShot = await userRef.get();
  
    if (!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        });
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }
    return userRef;
  };

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);
  
  export default firebase;
