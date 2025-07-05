<template>
  <v-snackbar v-model="messagesStore.show"
    :timeout="messagesStore.timeout"
    :color="messagesStore.color"
    location="top right"
    multi-line
    position="fixed">
    {{ messagesStore.message }}
    <template #actions>
      <v-btn icon
        @click="messagesStore.close">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
  import { useMessagesStore } from '@/stores/messages';
  import { defineComponent } from 'vue';

  export default defineComponent({
    setup() {
      const messagesStore = useMessagesStore();

      return {
        messagesStore,
      };
    }
  })

</script>
