import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
var firebaseConfig = {
    apiKey: "AIzaSyBEFTj9rN4k8dt6GlqXC75icwhKrIBWYjs",
    authDomain: "wireframer-cyllee.firebaseapp.com",
    databaseURL: "https://wireframer-cyllee.firebaseio.com",
    projectId: "wireframer-cyllee",
    storageBucket: "wireframer-cyllee.appspot.com",
    messagingSenderId: "222641140248",
    appId: "1:222641140248:web:107b4738cab22ce2fc496d",
    measurementId: "G-Y7182R21F9"

    // My Firebase
    /*
    apiKey: "AIzaSyAAj3gbzZNr3Yuz2xJQE-rPKyaQcXi5lkg",
    authDomain: "todo-rrf-316-cyllee.firebaseapp.com",
    databaseURL: "https://todo-rrf-316-cyllee.firebaseio.com",
    projectId: "todo-rrf-316-cyllee",
    storageBucket: "todo-rrf-316-cyllee.appspot.com",
    messagingSenderId: "310472154444",
    appId: "1:310472154444:web:3c6b5bf103de9f034a03e9",
    measurementId: "G-V56WNREQQW"
    */
};
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;