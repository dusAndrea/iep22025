// src/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDNYbae3nRWU9eXJfUNpIL-HwWVjGhEPfg",
  authDomain: "iep22025.firebaseapp.com",
  projectId: "iep22025",
  storageBucket: "iep22025.firebasestorage.app",
  messagingSenderId: "445311261398",
  appId: "1:445311261398:web:cb623482867ab791c74777"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
