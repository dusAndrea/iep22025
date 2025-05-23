import { defineStore } from 'pinia';
import { db } from '@/services/';
import { collection, query, where, getDocs, addDoc, } from 'firebase/firestore';
import { type UserType } from '@/types';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as UserType | null,
  }),
  persist: true,
  getters: {
    isLoggedIn: (state) => !!state.user,
  },
  actions: {
    async register(user: UserType): Promise<void> {
      // controlla se l'utente esiste già
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', user.email));

      const result = await getDocs(q);

      if (!result.empty) {
        throw new Error('Utente già registrato.');
      }

      // se non esiste, aggiungi il nuovo utente
      await addDoc(usersRef, user);
    },

    logout(): void {
      this.user = null;
    },

    async login(user: UserType): Promise<void> {

      const q = query(collection(db, 'users'),
        where('email', '==', user.email),
        where('password', '==', user.password));

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error('Credenziali non valide.');
      }

      const userDoc = querySnapshot.docs[0];

      this.user = userDoc.data() as UserType;
    }
  },
});
