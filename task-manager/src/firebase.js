// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQyKDjhrkzuqFn4bjM3EJJkh1Pa08ErN4",
  authDomain: "collection-documents-activity.firebaseapp.com",
  projectId: "collection-documents-activity",
  storageBucket: "collection-documents-activity.firebasestorage.app",
  messagingSenderId: "935597313146",
  appId: "1:935597313146:web:1af6a6be56227108a63fc3",
  measurementId: "G-2VHQ7KTT37"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);