import { defineStore } from 'pinia';
import { auth, db } from '@/services/firebaseServices';
import { collection, query, where, getDoc, deleteDoc, getDocs, addDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import { reauthenticateWithCredential, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, deleteUser } from 'firebase/auth';
import { type UserType } from '@/types';

export const useUserStore = defineStore('user', {
  state: () => ({
    uid: null as string | null,
    displayName: null as string | null,
    email: null as string | null,
  }),
  persist: true,
  getters: {
    isLoggedIn: state => !!state.uid,
    getDisplayName: state => state.displayName,
    getEmail: state => state.email,
    getShortDisplayName: state => {
      const words = state.displayName?.split(" ");
      const firstLetters = words?.map((word) => word[0]);
      return firstLetters?.join("");
    },
  },
  actions: {
    setUser(user: { uid: string; displayName?: string; email?: string; }) {
      this.uid = user.uid;
      this.displayName = user.displayName || '';
      this.email = user.email || '';
    },

    async deleteAccount(): Promise<void> {
      try {
        const currentUser = auth.currentUser;

        // Elimina dati Firestore
        await deleteDoc(doc(db, 'users', currentUser?.uid));

        // Elimina account Firebase
        await deleteUser(currentUser);

        this.resetUser();
      } catch {
        throw new Error('Operazione fallita');
      }
    },

    resetUser(): void {
      this.uid = null;
      this.displayName = null;
      this.email = null;
    },

    async register(newUser: UserType): Promise<void> {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, newUser.email, newUser.password);
        const user = userCredential.user;
        const displayName = `${newUser.firstName} ${newUser.lastName}`;

        await updateProfile(user, { displayName: displayName });

        await setDoc(doc(db, 'users', user.uid), {
          displayName: displayName,
          email: newUser.email,
          createdAt: new Date()
        });

        this.setUser(user.uid, newUser.email, displayName);
      } catch (error: any) {
        const errorCode = error.code;
        const errorMessage = error.message;
        let customError;

        switch (errorCode) {
          case 'auth/email-already-in-use':
            customError = 'Email già registrata';
            break;
          case 'auth/invalid-email':
            customError = 'Email non valida';
            break;
          case 'auth/weak-password':
            customError = 'Password troppo debole';
            break;
          default:
            customError = `Errore generico ${errorMessage}`;
        }

        throw new Error(customError);
      }
    },

    logout(): void {
      this.resetUser();
    },

    async login(userLogin: UserType): Promise<void> {
      let message = 'Errore di autenticazione';

      try {
        const userCredential = await signInWithEmailAndPassword(auth, userLogin.email, userLogin.password);
        const user = userCredential.user;

        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          this.setUser({ uid: user.uid, ...docSnap.data() });
        } else {
          throw new Error(message);
        }
      } catch (error: any) {
        switch (error.code) {
          case 'auth/user-not-found':
            message = 'Utente non trovato';
            break;
          case 'auth/wrong-password':
            message = 'Password errata';
            break;
          case 'auth/invalid-email':
            message = 'Email non valida';
            break;
          case 'auth/too-many-requests':
            message = 'Troppi tentativi. Riprova più tardi.';
            break;
          case 'auth/network-request-failed':
            message = 'Errore di rete. Verifica la connessione.';
            break;
          default:
            console.error('Errore autenticazione non gestito:', error.code, error.message);
            break;
        }
      }
    },

    async update(userPayload: any): Promise<void> {
      // TODO: terminare il processo di aggiornamento
      try {
        const currentUser = auth.currentUser;

        await updateProfile(currentUser, {
          displayName: userPayload.displayName,
          email: userPayload.email,
        });

        const userDocRef = doc(db, 'users', currentUser.uid);

        await updateDoc(userDocRef, userPayload);

        this.setUser({ uid: currentUser?.uid, displayName: userPayload.displayName, email: userPayload?.email });
      } catch (error: any) {
        throw new Error('Errore durante l\'aggiornamento:');
      }
    }
  },
});
