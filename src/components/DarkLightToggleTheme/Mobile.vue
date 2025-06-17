<template>
  <v-snackbar v-model="snackBarModel"
    color="primary"
    rounded
    timeout="-1"
    location="bottom center"
    position="fixed"
    class="d-flex align-center d-sm-none mobile-snackbar">

    <div class="d-flex align-center justify-center">
      <div>
        <span>Light Mode</span>
        <v-icon class="mx-2">mdi-white-balance-sunny</v-icon>
      </div>

      <v-switch class="mx-3"
        v-model="model"
        color="secondary"
        inset
        hide-details
        @click="$emit('toggleEvent')"
        :aria-label="`Switch to ${model ? 'light' : 'dark'} mode`"></v-switch>
      <div>
        <v-icon class="mx-2">mdi-weather-night</v-icon>
        <span>Dark Mode</span>
      </div>
    </div>

  </v-snackbar>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';

  export default defineComponent({
    props: {
      isDark: {
        type: Boolean,
        required: true
      }
    },
    setup(props) {
      const model = ref(props.isDark);
      const snackBarModel = ref(true);

      return {
        model,
        snackBarModel
      };
    }
  });
</script>
<style scoped>
  .mobile-snackbar {
    top: unset;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
</style>
