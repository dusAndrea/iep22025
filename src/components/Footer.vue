<template>
  <v-footer v-if="isLoggedIn"
    color="primary"
    class="text-center d-flex flex-column p-1"
    app>
    <v-img :width="80"
      aspect-ratio="16/9"
      cover
      :src="imgPath" />
  </v-footer>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue';
  import lightLogo from '@/assets/logo_nobg_light.png';
  import darkLogo from '@/assets/logo_nobg_dark.png';
  import { useTheme } from 'vuetify';
  import { useUserStore } from '@/stores';
  import { storeToRefs } from 'pinia';
  export default defineComponent({
    setup() {
      const userStore = useUserStore();
      const { isLoggedIn } = storeToRefs(userStore);
      const theme = useTheme();
      const imgPath = computed(() => theme.global.name.value === 'dark' ? darkLogo : lightLogo);

      return {
        imgPath,
        isLoggedIn
      };
    }
  });
</script>
