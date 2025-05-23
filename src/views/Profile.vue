<template>
  <v-row>
    <v-col cols="12">
      <h1 class="text-text">Il tuo profilo utente</h1>
      <h3 class="text-primary">Aggiorna i tuoi dati</h3>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <v-card class="pa-4 mx-auto">
        <v-card-text>
          <v-form @submit.prevent="handleUpdate"
            v-model="formIsValid">
            <v-row>
              <v-col>
                <v-text-field v-model="firstName"
                  label="Nome"
                  outlined
                  readonly />
              </v-col>
              <v-col>
                <v-text-field v-model="lastName"
                  label="Cognome"
                  outlined
                  readonly />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field v-model="email"
                  label="Inserisci una nuova Email"
                  type="email"
                  required
                  outlined
                  clearable
                  :rules="[requiredRule, emailRule]" />
              </v-col>
              <v-col>
                <v-text-field v-model="confirmEmail"
                  label="Conferma la nuova Email"
                  type="email"
                  required
                  outlined
                  clearable
                  :rules="[requiredRule, emailRule, matchRule(email)]" />
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <v-text-field name="password"
                  id="password"
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  label="Inserisci una nuova Password"
                  :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                  @click:append-inner="showPassword = !showPassword"
                  required
                  outlined
                  clearable
                  autocomplete />
              </v-col>
              <v-col>
                <v-text-field name="confirmPassword"
                  id="confirmPassword"
                  v-model="confirmPassword"
                  label="Conferma la nuova Password"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  :append-inner-icon="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
                  @click:append-inner="showConfirmPassword = !showConfirmPassword"
                  required
                  outlined
                  clearable
                  autocomplete
                  :rules="[matchRule(password)]" />
              </v-col>
            </v-row>
            <v-row>
              <v-col class="d-flex justify-space-between">
                <v-btn color="red"
                  variant="text"
                  @click="deleteAccount">Elimina Account</v-btn>

                <v-btn color="primary"
                  class="ml-a"
                  @click="updatePassword"
                  :disabled="!formIsValid">Aggiorna i tuoi dati</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { useUserStore } from '@/stores/user';
  import { useMessagesStore } from '@/stores/messages';
  import { useValidationRules } from '@/composables';

  export default defineComponent({
    name: 'Profile',
    setup() {
      const userStore = useUserStore();
      const messagesStore = useMessagesStore();
      const showPassword = ref(false);
      const showConfirmPassword = ref(false);
      const firstName = ref(userStore.user?.firstName);
      const lastName = ref(userStore.user?.lastName);
      const email = ref(userStore.user?.email);
      const confirmEmail = ref(userStore.user?.email);
      const password = ref('');
      const confirmPassword = ref('');
      const error = ref<string | null>(null);
      const { emailRule, requiredRule, matchRule } = useValidationRules();

      const formIsValid = ref(false);

      const handleUpdate = async () => {
        // try {
        //   const payload = {
        //     email: email.value,
        //     password: password.value
        //   } as UserType;

        //   await userStore.login(payload);
        //   messagesStore.showMessage('Login effettuato con successo', 'success');
        // }
        // catch (error: any) {
        //   messagesStore.showMessage(error.message);
        // }
      };

      const updatePassword = () => {
        // if (!auth.user) return

        // const user = JSON.parse(localStorage.getItem(auth.user))
        // if (user) {
        //   user.password = newPassword.value
        //   localStorage.setItem(auth.user, JSON.stringify(user))
        //   alert('Password aggiornata')
        //   newPassword.value = ''
        // }
      };

      const deleteAccount = () => {
        // if (!auth.user) return

        // if (confirm('Sei sicuro di voler eliminare il tuo account?')) {
        //   localStorage.removeItem(auth.user)
        //   localStorage.removeItem('loggedInUser')
        //   auth.logout()
        //   alert('Account eliminato')
        //   router.push('/register')
        // }
      };
      return {
        showPassword,
        showConfirmPassword,
        firstName,
        lastName,
        email,
        confirmEmail,
        password,
        confirmPassword,
        error,
        emailRule,
        requiredRule,
        matchRule,
        updatePassword,
        deleteAccount,
        userStore,
        handleUpdate,
        formIsValid,



      };
    }
  })




</script>
