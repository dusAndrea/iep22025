<template>
  <v-card class="pa-4 mx-auto"
    v-if="!quizCompleted">
    <v-card-title>Domanda {{ currentIndex + 1 }} / {{ questions.length }}</v-card-title>
    <v-card-text>
      <div>{{ currentQuestion.question }}</div>
      <v-radio-group v-model="userAnswer">
        <v-radio v-for="(option, index) in currentQuestion.options"
          :key="index"
          :label="option"
          :value="option" />
      </v-radio-group>
    </v-card-text>
    <v-card-actions>
      <v-btn :disabled="!userAnswer"
        primary
        @click="submitAnswer">Avanti</v-btn>
    </v-card-actions>
  </v-card>

  <v-card v-else>
    <v-card-title>Risultato</v-card-title>
    <v-card-text>
      Hai risposto correttamente a {{ score }} domande su {{ questions.length }}.
    </v-card-text>
    <v-card-actions>
      <v-btn @click="saveResult">Salva su Firestore</v-btn>
      <v-btn color="secondary"
        @click="resetQuiz">Ricomincia</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script lang="ts">
  import { ref, computed, defineComponent, onMounted } from 'vue';
  //import { doc, updateDoc, arrayUnion } from 'firebase/firestore';


  export default defineComponent({
    setup() {
      


      const currentIndex = ref(0);
      const userAnswer = ref('');
      const score = ref(0);
      const quizCompleted = ref(false);

      const currentQuestion = computed(() => questions[currentIndex.value]);

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
        currentIndex.value = 0;
        userAnswer.value = '';
        score.value = 0;
        quizCompleted.value = false;
      }



      return {
        questions,
        quizCompleted,
        currentIndex,
        currentQuestion,
        userAnswer,
        score,
        submitAnswer,
        resetQuiz,
        saveResult,
      };
    }
  })

</script>
