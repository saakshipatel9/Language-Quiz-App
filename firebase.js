// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
import firestore from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwzY9Kv31HPX7I7bofUu_TwGAbDTVQGSU",
  authDomain: "quizapp-3caa2.firebaseapp.com",
  projectId: "quizapp-3caa2",
  storageBucket: "quizapp-3caa2.appspot.com",
  messagingSenderId: "905898688557",
  appId: "1:905898688557:web:9d2da5546c69335333b8a4",
};

// Initialize Firebase
let app;
if (firebase.apps.length == 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };
