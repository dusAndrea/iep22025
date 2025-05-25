<template>
  <v-card color="background"
    :border="false"
    :flat="true">
    <v-card-title>
      <h1 class="text-h4 text-secondary">Benvenuto</h1>
    </v-card-title>

    <v-spacer />

    <v-card-subtitle>Non hai un account? <RouterLink to="/register">Registrati</RouterLink></v-card-subtitle>

    <v-card-text>
      <v-form @submit.prevent="handleLogin"
        v-model="formIsValid">
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="email"
              label="Email"
              type="email"
              required
              outlined
              clearable
              :rules="[requiredRule, emailRule]" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field name="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              label="Password"
              :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append-inner="showPassword = !showPassword"
              outlined
              required
              clearable
              autocomplete
              :rules="[requiredRule, minLength]" />
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="4">
            <v-btn block
              color="primary"
              type="submit"
              :loading="loading"
              :disabled="!formIsValid">
              Accedi
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';

  import { useRouter } from 'vue-router';
  import { useUserStore } from '@/stores/user';
  import { useMessagesStore } from '@/stores/messages';
  import { useValidationRules } from '@/composables';
  import type { UserType } from '@/types';

  export default defineComponent({
    name: 'UserLogin',

    setup: () => {
      const email = ref('');
      const password = ref('');
      const showPassword = ref(false);
      const { emailRule, requiredRule, minLength } = useValidationRules();
      const formIsValid = ref(false);
      const router = useRouter();
      const userStore = useUserStore();
      const feedbackStore = useMessagesStore();
      const loading = ref(false);

      const handleLogin = async () => {
        try {
          loading.value = true;
          const payload = {
            email: email.value,
            password: password.value
          } as UserType;

          await userStore.login(payload);
          router.push('/dashboard');
        }
        catch (error: any) {
          feedbackStore.showMessage(error.message, 'error');
        } finally {
          loading.value = false;
        }
      };

      return {
        email,
        password,
        showPassword,
        formIsValid,
        loading,
        emailRule,
        requiredRule,
        minLength,
        handleLogin
      };
    }
  });
</script>
