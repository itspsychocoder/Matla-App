import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCGWY_nDKHM6h9MmJfh7oG-Y915-bpbAWg",
    authDomain: "matla-bb72b.firebaseapp.com",
    projectId: "matla-bb72b",
    storageBucket: "matla-bb72b.appspot.com",
    messagingSenderId: "757188871949",
    appId: "1:757188871949:web:fa27f83c004d40fa735244",
    measurementId: "G-F7Z8P2NMK2"
};



const app = initializeApp(firebaseConfig);


export const storage = getStorage();