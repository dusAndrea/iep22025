<template>
  <!-- Toggle Theme -->
  <div class="d-none d-sm-flex align-center">
    <v-icon class="mr-2">mdi-white-balance-sunny</v-icon>
    <v-switch v-model="model"
      color="secondary"
      inset
      hide-details
      @click="$emit('toggleEvent')"
      :aria-label="`Switch to ${model ? 'light' : 'dark'} mode`"></v-switch>
    <v-icon class="ml-2">mdi-weather-night</v-icon>
  </div>
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

      return {
        model
      };
    }
  });
</script>
