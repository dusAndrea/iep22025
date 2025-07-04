<template>
  <DefaultCardWrapper :title="'Quanto informato sei in fatto di sostenibilità ambientale?'">
    <template #cardContent>
      <v-list>
        <v-list-item v-for="(q, i) in getQuizHistory"
          :key="i">
          <v-list-item-content>
            <v-list-item-title>
              {{ formatDate(q.date) }} – {{ q.score }}/{{ q.total }}
            </v-list-item-title>
            <v-list-item-subtitle>
              Risposte corrette: {{q.answers.filter(a => a.isCorrect).length}}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </template>
  </DefaultCardWrapper>
</template>
<script lang="ts">
  import { defineComponent, onMounted } from 'vue';
  import DefaultCardWrapper from '@/components/DefaultCardWrapper.vue';
  import { useUserStore } from '@/stores';
  import { storeToRefs } from 'pinia';

  export default defineComponent({
    components: {
      DefaultCardWrapper
    },
    setup() {
      const userStore = useUserStore();
      const { getQuizHistory } = storeToRefs(userStore);

      onMounted(() => {
        userStore.fetchQuizHistory();
      });

      return {
        getQuizHistory
      };
    }
  });
</script>
