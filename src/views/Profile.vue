<template>
  <v-row>
    <v-col cols="12">
      <h1 class="text-text">Il tuo profilo utente</h1>
      <h3 class="text-primary">Aggiorna i tuoi dati</h3>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols>
      <v-card class="pt-4 mb-6 mx-auto">
        <v-card-text>
          <v-form @submit.prevent="handleUpdate"
            v-model="formIsValid">
            <v-row>
              <v-col cols="12"
                md="6">
                <v-text-field v-model="firstName"
                  label="Nome"
                  type="text"
                  required
                  outlined
                  clearable
                  :rules="[requiredRule]" />
              </v-col>
              <v-col cols="12"
                md="6">
                <v-text-field v-model="lastName"
                  label="Cognome"
                  type="text"
                  required
                  outlined
                  clearable
                  :rules="[requiredRule]" />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12"
                md="6">
                <v-text-field v-model="email"
                  label="Inserisci una nuova Email"
                  type="email"
                  required
                  outlined
                  clearable
                  :rules="[requiredRule, emailRule]" />
              </v-col>
              <v-col cols="12"
                md="6">
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
              <v-col class="d-flex justify-space-between">
                <v-btn color="red"
                  variant="text"
                  @click="showDeleteDialog = true">Elimina Account</v-btn>

                <v-btn color="primary"
                  class="ml-a"
                  @click="handleUpdate"
                  :loading="loading"
                  :disabled="!formIsValid">Aggiorna</v-btn>
              </v-col>
            </v-row>

            <v-dialog v-model="showDeleteDialog"
              max-width="500">
              <v-card>
                <v-card-title class="text-h6">Conferma eliminazione</v-card-title>
                <v-card-text>
                  Sei sicuro di voler eliminare il tuo account? Questa azione è irreversibile.
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn text
                    @click="showDeleteDialog = false">Annulla</v-btn>
                  <v-btn color="error"
                    @click="deleteAccount">Conferma</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
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
  import type { UserType } from '@/types';
  import { storeToRefs } from 'pinia';
  import router from '@/router';

  export default defineComponent({
    setup() {
      const userStore = useUserStore();
      const { getEmail, getDisplayName } = storeToRefs(userStore);
      const messagesStore = useMessagesStore();
      const { getTimeout } = storeToRefs(messagesStore);
      const showPassword = ref(false);
      const showConfirmPassword = ref(false);
      const password = ref('');
      const confirmPassword = ref('');
      const error = ref<string | null>(null);
      const { emailRule, requiredRule, matchRule } = useValidationRules();
      const email = ref('');
      const confirmEmail = ref('');
      const firstName = ref('');
      const lastName = ref('');
      const formIsValid = ref(false);
      const loading = ref(false);
      const showDeleteDialog = ref(false);

      const handleUpdate = async () => {

        try {
          loading.value = true;
          const payload = {
            displayName: `${firstName.value} ${lastName.value}`,
            email: email.value
          } as UserType;

          await userStore.update(payload);
          messagesStore.showMessage('Dati aggiornati con successo', 'success');
        }
        catch (error: any) {
          messagesStore.showMessage(error.message, 'error');
        } finally {
          loading.value = false;
        }
      };


      const deleteAccount = async () => {
        try {
          userStore.deleteAccount();
          messagesStore.showMessage('Utente eliminato con successo', 'success');
          setTimeout(() => {
            // redirect to home page after successful registration
            router.push('/login');
          }, getTimeout.value);
        } catch (error: any) {
          messagesStore.showMessage(error.message, 'error');
        }
      };

      onMounted(() => {
        const displayName = getDisplayName.value ?? '';
        const nameParts = displayName.split(' ');
        firstName.value = nameParts[0] || '';
        lastName.value = nameParts.slice(1).join(' ') || '';
        email.value = getEmail.value ?? '';
        confirmEmail.value = getEmail.value ?? '';
      });

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
        loading,
        emailRule,
        requiredRule,
        matchRule,
        showDeleteDialog,
        deleteAccount,
        userStore,
        handleUpdate,
        formIsValid,
      };
    }
  });
</script>
