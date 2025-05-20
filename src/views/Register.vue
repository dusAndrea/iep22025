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
        <v-row>
          <v-col cols="12">
            <h3 class="text-h4 ">Crea un account</h3>
          </v-col>

          <v-col cols="12">
            <p class="text-body-1">Ha già un account?
              <RouterLink to="/login">Accedi</RouterLink>
            </p>
          </v-col>
        </v-row>
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
            <v-btn class="mt-4"
              color="tertiary"
              type="submit"
              block
              :disabled="!formIsValid">
              Registrati
            </v-btn>
          </v-form>

        </v-card-text>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
  import { defineComponent, ref, computed } from 'vue'
  import { TaglineCard } from '@/components'
  import { useUserStore } from '@/stores/user'
  import { useRouter } from 'vue-router'
  import taglineImage from '@/assets/tagline_opacity.png'
  import { useFeedbackStore } from '@/stores/feedback'
  import { storeToRefs } from 'pinia'
  import { useValidationRules } from '@/composables'
  export default defineComponent({
    name: 'UserRegister',
    components: {
      TaglineCard
    },
    setup: () => {
      const showPassword = ref(false)
      const showConfirmPassword = ref(false)
      const firstName = ref('')
      const lastName = ref('')
      const email = ref('')
      const password = ref('')
      const confirmPassword = ref('')
      const error = ref<string | null>(null)
      const userStore = useUserStore();
      const feedbackStore = useFeedbackStore()
      const { getTimeout } = storeToRefs(feedbackStore)
      const router = useRouter()
      const { emailRule, requiredRule, matchRule } = useValidationRules()
      const formIsValid = ref(false)

      const handleRegister = async () => {
        try {
          const payload = {
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            password: password.value
          }

          // register the user
          await userStore.register(payload)

          feedbackStore.showMessage('Utente creato con successo', 'success')

          setTimeout(() => {
            // redirect to home page after successful registration
            router.push('/login')
          }, getTimeout.value);

        } catch (e: any) {
          feedbackStore.showMessage(e.message)
        }
      }

      return {
        showPassword,
        showConfirmPassword,
        firstName,
        lastName,
        email,
        emailRule,
        requiredRule,
        matchRule,
        password,
        confirmPassword,
        error,
        formIsValid,
        handleRegister,
        taglineImage
      }
    }
  })
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
