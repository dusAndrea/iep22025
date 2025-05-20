<template>
  <v-container class="login fill-height"
    fluid>
    <v-row class="fill-height"
      no-gutters>
      <v-col cols="6">
        <TaglineCard />
      </v-col>

      <v-col cols="4"
        offset="1"
        align-self="center"
        class="text-text">
        <h3 class="text-h4">Login</h3>
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
                  :rules="[requiredRule]" />
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col cols="4">
                <v-btn color="primary"
                  block
                  type="submit"
                  :disabled="!formIsValid">
                  Accedi
                </v-btn>
              </v-col>
            </v-row>

          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <p class="text-body-1">
            Non hai un account? <RouterLink to="/register">Registrati</RouterLink>
          </p>
        </v-card-actions>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { TaglineCard } from '@/components';
  import { useRouter } from 'vue-router';
  import { useUserStore } from '@/stores/user';
  import { useFeedbackStore } from '@/stores/feedback';
  import { useValidationRules } from '@/composables';
  import type { UserType } from '@/types';

  export default defineComponent({
    name: 'UserLogin',
    components: {
      TaglineCard
    },

    setup: () => {
      const email = ref('');
      const password = ref('');
      const showPassword = ref(false);
      const { emailRule, requiredRule } = useValidationRules();
      const formIsValid = ref(false);

      const router = useRouter();
      const userStore = useUserStore();
      const feedbackStore = useFeedbackStore();

      const handleLogin = async () => {
        try {
          const payload = {
            email: email.value,
            password: password.value
          } as UserType;

          await userStore.login(payload);
          feedbackStore.showMessage('Login effettuato con successo', 'success');
          router.push('/dashboard');
        }
        catch (error: any) {
          feedbackStore.showMessage(error.message);
        }
      };

      return {
        email,
        password,
        showPassword,
        formIsValid,
        emailRule,
        requiredRule,
        handleLogin
      };
    }
  });
</script>
