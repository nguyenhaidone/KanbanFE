import firebase from "firebase/compat/app";
import "firebase/compat/storage"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgJGkJKq4uJHJPwrE0lmu95mHQhwEU7ZY",
  authDomain: "taskmanagementkanban-345604.firebaseapp.com",
  projectId: "taskmanagementkanban-345604",
  storageBucket: "taskmanagementkanban-345604.appspot.com",
  messagingSenderId: "532459309976",
  appId: "1:532459309976:web:d6f4e64960aecb07df79ed",
  measurementId: "G-6VEPZ65CL1",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
