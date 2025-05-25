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
  import { ref, computed, defineComponent } from 'vue';
  //import { doc, updateDoc, arrayUnion } from 'firebase/firestore';

  export default defineComponent({
    setup() {
      const questions = [
        {
          question: 'Qual è la principale causa del cambiamento climatico?',
          options: ['Deforestazione', 'Agricoltura biologica', 'Energia solare'],
          answer: 'Deforestazione',
        },
        {
          question: `Quale gas è il principale responsabile dell'effetto serra?`,
          options: ['Ossigeno', 'Anidride carbonica', 'Azoto'],
          answer: 'Anidride carbonica',
        },
        {
          question: 'Quale delle seguenti è una fonte di energia rinnovabile?',
          options: ['Carbone', 'Petrolio', 'Energia eolica'],
          answer: 'Energia eolica',
        },
        {
          question: 'Che cosa significa riciclo?',
          options: [
            'Usare un prodotto una sola volta',
            'Buttare via i rifiuti',
            'Trasformare i rifiuti in nuovi prodotti'
          ],
          answer: 'Trasformare i rifiuti in nuovi prodotti',
        },
        {
          question: 'Qual è il simbolo della raccolta differenziata?',
          options: ['Un albero', 'Tre frecce che formano un triangolo', 'Una bottiglia'],
          answer: 'Tre frecce che formano un triangolo',
        },
        {
          question: `Come possiamo ridurre l'uso della plastica?`,
          options: [
            'Usare bottiglie riutilizzabili',
            'Comprare più plastica',
            'Gettare la plastica nel mare'
          ],
          answer: 'Usare bottiglie riutilizzabili',
        },
        {
          question: `Qual è un effetto dell'inquinamento atmosferico?`,
          options: ['Aria pulita', 'Piogge acide', 'Più foreste'],
          answer: 'Piogge acide',
        },
        {
          question: 'Perché è importante piantare alberi?',
          options: [
            `Per aumentare l'inquinamento`,
            `Per produrre ossigeno`,
            'Per ridurre la biodiversità'
          ],
          answer: 'Per produrre ossigeno',
        },
        {
          question: 'Qual è un buon modo per risparmiare energia in casa?',
          options: ['Lasciare le luci accese', 'Usare lampadine LED', 'Aprire il frigo spesso'],
          answer: 'Usare lampadine LED',
        },
        {
          question: 'Cosa significa sostenibilità?',
          options: [
            'Utilizzare risorse in modo che durino nel tempo',
            'Consumare tutto subito',
            'Ignorare i cambiamenti climatici'
          ],
          answer: 'Utilizzare risorse in modo che durino nel tempo',
        },
      ];

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
        saveResult
      };
    }
  })

</script>
