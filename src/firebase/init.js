import firebase from 'firebase'
import firestore from 'firebase/firestore'

// web app Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAH8SjYEb8AUzqf7owfis1NRKOn2w1ab3k",
    authDomain: "killer-recipes.firebaseapp.com",
    databaseURL: "https://killer-recipes.firebaseio.com",
    projectId: "killer-recipes",
    storageBucket: "killer-recipes.appspot.com",
    messagingSenderId: "422690456694",
    appId: "1:422690456694:web:cef2aca7fd42962b"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  firebaseApp.firestore().settings({ timestampsInSnapshots: true })

  // export firestore database
  export default firebaseApp.firestore()