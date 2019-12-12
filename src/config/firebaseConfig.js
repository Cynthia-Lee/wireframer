import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
var firebaseConfig = {
    apiKey: "AIzaSyB651F8jJUazEWTJ2666ZDzBr-yw8pfsHo",
    authDomain: "todo-rrf-316-c.firebaseapp.com",
    databaseURL: "https://todo-rrf-316-c.firebaseio.com",
    projectId: "todo-rrf-316-c",
    storageBucket: "todo-rrf-316-c.appspot.com",
    messagingSenderId: "463939744359",
    appId: "1:463939744359:web:56a4f7a5c5fe37e58d5ac2",
    measurementId: "G-658NWVT68B"

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

    // McKenna's Firebase
    /*
    apiKey: "AIzaSyCJxkqx-6PMJrZ7ACkrgbO55b5wmJdop1Y",
    authDomain: "todo-rrf-316.firebaseapp.com",
    databaseURL: "https://todo-rrf-316.firebaseio.com",
    projectId: "todo-rrf-316",
    storageBucket: "todo-rrf-316.appspot.com",
    messagingSenderId: "892398996038",
    appId: "1:892398996038:web:1fb9157fc6c5d266e01847",
    measurementId: "G-TEGQB3MZ23"
    */
};
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;