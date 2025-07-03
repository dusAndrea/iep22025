export function useFirebaseAuthError() {
  const getFirebaseAuthErrorMessage = (code: string): string => {
    switch (code) {
      case 'auth/invalid-email':
        return 'L\'email inserita non è valida.';

      case 'auth/email-already-in-use':
        return 'L\'indirizzo email è già registrato.';

      case 'auth/user-not-found':
      case 'auth/invalid-credential':
      case 'auth/wrong-password':
        return 'Email o password non validi.';

      case 'auth/user-disabled':
        return 'Questo account è stato disabilitato.';

      case 'auth/too-many-requests':
        return 'Troppi tentativi falliti. Riprova più tardi.';

      case 'auth/weak-password':
        return 'La password deve contenere almeno 6 caratteri.';

      case 'auth/missing-password':
        return 'Inserisci una password.';

      case 'auth/missing-email':
        return 'Inserisci un indirizzo email.';

      case 'auth/popup-closed-by-user':
        return 'Login interrotto: la finestra è stata chiusa.';

      case 'auth/network-request-failed':
        return 'Errore di rete. Controlla la connessione.';

      case 'auth/internal-error':
        return 'Errore interno. Riprova.';

      case 'auth/operation-not-allowed':
        return 'Metodo di accesso non abilitato.';

      case 'auth/invalid-verification-code':
        return 'Codice di verifica non valido.';

      case 'auth/requires-recent-login':
        return 'Effettua nuovamente il login per completare l\'operazione.';

      default:
        return 'Errore di autenticazione. Riprova.';
    }
  };

  return { getFirebaseAuthErrorMessage };
}
