<template>
  <v-form>
    <Transition>
      <v-card v-if="loading">
        <v-progress-circular indeterminate
          color="primary"
          class="ma-auto" />
      </v-card>
      <DefaultCardWrapper v-else-if="!quizCompleted && questions.length"
        :title="title"
        flat>
        <template #cardContent>
          <div class="py-2">
            <v-progress-linear color="teal"
              interval="1"
              :max="questions.length"
              :model-value="currentIndex"
              stream></v-progress-linear>
          </div>

          <v-radio-group v-model="userAnswer">
            <v-radio v-for="(option, index) in currentQuestion.options"
              :key="index"
              :label="option.text"
              :value="option.value" />
          </v-radio-group>
          <v-btn :disabled="userAnswer === null"
            @click="handleSave">Avanti</v-btn>
        </template>
      </DefaultCardWrapper>
      <DefaultCardWrapper v-else
        title="Risultato"
        flat>
        <template #cardContent>
          <v-container fluid
            class="pa-0">
            <v-row>
              <v-col cols="12">
                <p class="text-body-1">Hai risposto correttamente a {{ score }} domande su {{ questions.length }}.</p>
              </v-col>
            </v-row>
          </v-container>
        </template>
      </DefaultCardWrapper>
    </Transition>
  </v-form>
</template>
<script lang="ts">
  import { ref, computed, defineComponent, onMounted } from 'vue';
  import { useQuestionsStore, useUserStore, useMessagesStore } from '@/stores';
  import type { QuestionType } from '@/types';
  import { storeToRefs } from 'pinia';
  import DefaultCardWrapper from '@/components/DefaultCardWrapper.vue';
  export default defineComponent({
    components: {
      DefaultCardWrapper
    },
    setup() {
      const questionsStore = useQuestionsStore();
      const userStore = useUserStore();
      const messagesStore = useMessagesStore();
      const { getQuestions } = storeToRefs(questionsStore);
      const { getUID } = storeToRefs(userStore);
      const currentIndex = ref(0);
      const userAnswer = ref<null | string | number>(null);
      const userAnswers = ref<string[]>([]);
      const score = ref(0);
      const quizCompleted = ref(false);
      const questions = ref<QuestionType[]>([]);
      const loading = ref(true);

      const handleSave = () => {
        if (Number(userAnswer.value) === Number(currentQuestion.value.answer)) {
          score.value++;
        }

        userAnswers.value.push(userAnswer.value);

        if (currentIndex.value < questions.value.length - 1) {
          currentIndex.value++;
          userAnswer.value = null;
        } else {
          quizCompleted.value = true;
          handleSubmit();
        }
      };

      const handleSubmit = async () => {
        if (!getUID.value) {
          return;
        }

        const payload = {
          userId: getUID.value,
          date: new Date().toISOString(),
          score: score.value,
          total: questions.value.length,
          answers: questions.value.map((q, i) => ({
            question: q.question,
            selected: userAnswers.value[i],
            correct: q.answer,
            isCorrect: String(userAnswers.value[i]) === String(q.answer)
          }))
        };

        try {
          await questionsStore.submitAssesment(payload);
          messagesStore.showMessage('Salvataggio avvenuto correttamente', 'success');
        } catch (error: any) {
          messagesStore.showMessage(error, 'error');
        }
      };

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
        userAnswers,
        score,
        loading,
        title,
        handleSave,
        handleSubmit,
      };
    }
  })

</script>
