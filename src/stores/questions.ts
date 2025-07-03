import { defineStore } from 'pinia';
import { auth, db } from '@/services/firebaseServices';
import { collection, query, where, getDoc, deleteDoc, getDocs, addDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import { reauthenticateWithCredential, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, deleteUser } from 'firebase/auth';
import { type QuestionType } from '@/types';
import { FirebaseError } from 'firebase/app';

export const useQuestionsStore = defineStore('questions', {
  state: () => ({
    questions: [] as Array<QuestionType>,
  }),
  persist: true,
  getters: {
    getQuestions: (state) => {
      if (!state.questions.length) {
        this.fetchRandomQuestions();
      }

      return state.questions;
    },
  },
  actions: {
    async fetchRandomQuestions(limit = 10) {
      const querySnapshot = await getDocs(collection(db, 'questions'));

      const allQuestions = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Shuffle + slice
      const shuffled = allQuestions.sort(() => 0.5 - Math.random());
      this.questions = shuffled.slice(0, limit);
    }
  }
});
