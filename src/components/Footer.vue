<template>
  <v-footer color="primary"
    class="text-center d-flex flex-column p-4"
    app>
    <v-img :width="100"
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

  export default defineComponent({
    setup() {
      const theme = useTheme();
      const imgPath = computed(() => theme.global.name.value === 'dark' ? darkLogo : lightLogo);

      return {
        imgPath
      };
    }
  });
</script>
