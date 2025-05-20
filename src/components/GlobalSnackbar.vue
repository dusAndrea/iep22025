<template>
  <v-snackbar v-model="feedbackStore.show"
    :timeout="feedbackStore.timeout"
    :color="feedbackStore.color"
    location="top right"
    multi-line
    position="fixed">
    {{ feedbackStore.message }}
    <template #actions>
      <v-btn icon
        @click="feedbackStore.close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
  import { useFeedbackStore } from '@/stores/feedback';
  import { defineComponent } from 'vue';

  export default defineComponent({
    setup() {
      const feedbackStore = useFeedbackStore();

      return {
        feedbackStore,
      };
    }
  })

</script>
