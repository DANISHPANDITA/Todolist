import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
        apiKey: "AIzaSyAgRr8c27sZ-uJBK3C-KxoHP4Il1GGkUbs",
        authDomain: "todolist-ce783.firebaseapp.com",
        databaseURL: "https://todolist-ce783.firebaseio.com",
        projectId: "todolist-ce783",
        storageBucket: "todolist-ce783.appspot.com",
        messagingSenderId: "562236058873",
        appId: "1:562236058873:web:bbb30df172c074837c4628",
        measurementId: "G-G9R21RJS3X"
});

const db = firebaseApp.firestore();

export default db;