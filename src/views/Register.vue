<template>
  <v-card color="background"
    :border="false"
    :flat="true">
    <v-card-title>
      <h1 class="text-h4 text-secondary">Crea un account</h1>
    </v-card-title>

    <v-spacer />

    <v-card-subtitle>Ha già un account?
      <RouterLink to="/login">Accedi</RouterLink>
    </v-card-subtitle>

    <v-card-text>
      <v-form @submit.prevent="handleRegister"
        v-model="formIsValid">
        <v-row>
          <v-col>
            <v-text-field v-model="firstName"
              label="Nome"
              required
              outlined
              clearable
              :rules="[requiredRule]" />
          </v-col>
          <v-col>
            <v-text-field v-model="lastName"
              label="Cognome"
              required
              outlined
              clearable
              :rules="[requiredRule]" />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-text-field v-model="email"
              label="Email"
              type="email"
              required
              outlined
              clearable
              :rules="[requiredRule, emailRule]" />
          </v-col>
          <v-col>
            <v-text-field v-model="confirmEmail"
              label="Ripeti Email"
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
              label="Password"
              :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append-inner="showPassword = !showPassword"
              required
              outlined
              clearable
              autocomplete
              :rules="[requiredRule]" />
          </v-col>
          <v-col>
            <v-text-field name="confirmPassword"
              id="confirmPassword"
              v-model="confirmPassword"
              label="Conferma Password"
              :type="showConfirmPassword ? 'text' : 'password'"
              :append-inner-icon="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append-inner="showConfirmPassword = !showConfirmPassword"
              required
              outlined
              clearable
              autocomplete
              :rules="[requiredRule, matchRule(password)]" />
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="4">
            <v-btn block
              color="primary"
              type="submit"
              :disabled="!formIsValid">
              Registrati
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { TagLineCard } from '@/components';
  import { useUserStore } from '@/stores/user';
  import { useRouter } from 'vue-router';
  import taglineImage from '@/assets/tagline_opacity.png';
  import { useMessagesStore } from '@/stores/messages';
  import { storeToRefs } from 'pinia';
  import { useValidationRules } from '@/composables';
  export default defineComponent({
    name: 'UserRegister',
    components: {
      TagLineCard
    },
    setup: () => {
      const showPassword = ref(false);
      const showConfirmPassword = ref(false);
      const firstName = ref('');
      const lastName = ref('');
      const email = ref('');
      const confirmEmail = ref('');
      const password = ref('');
      const confirmPassword = ref('');
      const error = ref<string | null>(null);
      const userStore = useUserStore();
      const feedbackStore = useMessagesStore();
      const { getTimeout } = storeToRefs(feedbackStore);
      const router = useRouter();
      const { emailRule, requiredRule, matchRule } = useValidationRules();
      const formIsValid = ref(false);

      const handleRegister = async () => {
        try {
          const payload = {
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            password: password.value
          };

          await userStore.register(payload);

          feedbackStore.showMessage('Utente creato con successo', 'success');

          setTimeout(() => {
            // redirect to home page after successful registration
            router.push('/login');
          }, getTimeout.value);

        } catch (e: any) {
          feedbackStore.showMessage(e.message);
        }
      };

      return {
        showPassword,
        showConfirmPassword,
        firstName,
        lastName,
        email,
        confirmEmail,
        emailRule,
        requiredRule,
        matchRule,
        password,
        confirmPassword,
        error,
        formIsValid,
        handleRegister,
        taglineImage
      };
    }
  });
</script>
<style lang="scss">
.login {
  &__poster {
    img {
      filter: opacity(0.3);
    }
  }
}
</style>
