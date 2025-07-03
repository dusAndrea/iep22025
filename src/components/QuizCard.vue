<template>
  <v-progress-circular v-if="loading"
    indeterminate
    color="primary"
    class="ma-auto" />
  <DefaultCardWrapper v-else-if="!quizCompleted && questions.length"
    :title="title">
    <template #cardContent>

      <v-radio-group v-model="userAnswer">
        <v-radio v-for="(option, index) in currentQuestion.options"
          :key="index"
          :label="option.text"
          :value="option.value" />
      </v-radio-group>

      <v-card-actions>
        <v-btn :disabled="isNaN(userAnswer)"
          color="primary"
          @click="submitAnswer">Avanti</v-btn>
      </v-card-actions>
    </template>
  </DefaultCardWrapper>
  <DefaultCardWrapper v-else>
    <template #cardContent>

      <v-card-title>Risultato</v-card-title>
      <v-card-text>
        Hai risposto correttamente a {{ score }} domande su {{ questions.length }}.
      </v-card-text>
      <v-card-actions>
        <v-btn @click="saveResult">Salva su Firestore</v-btn>
        <v-btn color="secondary"
          @click="resetQuiz">Ricomincia</v-btn>
      </v-card-actions>
    </template>
  </DefaultCardWrapper>
</template>
<script lang="ts">
  import { ref, computed, defineComponent, onMounted } from 'vue';
  import { useQuestionsStore } from '@/stores';
  import type { QuestionType } from '@/types';
  import { storeToRefs } from 'pinia';
  import DefaultCardWrapper from './DefaultCardWrapper.vue';
  export default defineComponent({
    components: {
      DefaultCardWrapper
    },
    setup() {
      const questionsStore = useQuestionsStore();
      const { getQuestions } = storeToRefs(questionsStore);
      const currentIndex = ref(0);

      const userAnswer = ref();
      const score = ref(0);
      const quizCompleted = ref(false);
      const questions = ref<QuestionType[]>([]);
      const loading = ref(true);

      function submitAnswer() {
        if (userAnswer.value === currentQuestion.value.answer) {
          score.value++;
        }

        if (currentIndex.value < questions.length - 1) {
          currentIndex.value++;
          userAnswer.value = '';
        } else {
          quizCompleted.value = true;
        }
      }

      async function saveResult() {
        // if (!currentUser.value) return;
        // const userRef = doc(db, 'users', currentUser.value.uid);
        // await updateDoc(userRef, {
        //   quizResults: arrayUnion({
        //     date: new Date().toISOString(),
        //     score: score.value,
        //   }),
        // });
      }

      function resetQuiz() {
        // currentIndex.value = 0;
        // userAnswer.value = '';
        // score.value = 0;
        // quizCompleted.value = false;
      }

      const currentQuestion = computed(() => {
        return questions.value[currentIndex.value] || { question: '', options: [], answer: '' };
      });

      const title = computed(() => {
        return `Domanda ${currentIndex.value + 1} / ${questions.value.length}: ${currentQuestion.value.question}`;
      });

      onMounted(async () => {
        questions.value = getQuestions.value;
        loading.value = false;
      });

      return {
        questions,
        quizCompleted,
        currentIndex,
        currentQuestion,
        userAnswer,
        score,
        loading,
        title,
        submitAnswer,
        resetQuiz,
        saveResult,
      };
    }
  })

</script>
