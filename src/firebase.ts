// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDu4feQrNufrvaEk3fSlNZS6g9OP6DlSyY",
  authDomain: "whispr-d8475.firebaseapp.com",
  projectId: "whispr-d8475",
  storageBucket: "whispr-d8475.appspot.com",
  messagingSenderId: "554380737728",
  appId: "1:554380737728:web:9c61f5fa786f4d62468125",
  measurementId: "G-36VWPME5Z1",
}

// Initialize Firebase
initializeApp(firebaseConfig)
export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()
