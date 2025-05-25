<template>
  <v-row>
    <v-col cols="12">
      <h1 class="text-text">Quante ne sai?</h1>
      <h3 class="text-primary">Spara&hellip; se ti riesce</h3>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12"
      sm="6"
      lg="7">
      <v-row>
        <v-col cols="12">
          <Transition>
            <Quiz v-if="showQuiz" />

            <v-card class="pa-4 mx-auto"
              v-else>
              <v-container>
                <v-row>
                  <v-col>
                    <h3>Quanto informato sei in fatto di sostenibilità ambientale?</h3>
                  </v-col>
                </v-row>
                <v-row align="center"
                  justify="center">
                  <v-col>
                    <v-btn primary
                      @click="showQuiz = !showQuiz">Inizia il quiz</v-btn>
                  </v-col>
                </v-row>
              </v-container>


            </v-card>
          </Transition>

        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12"
      sm="6"
      lg="5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, officia deserunt exercitationem et asperiores, esse laboriosam porro, eligendi tempora ad aspernatur rerum fuga excepturi! At distinctio rem pariatur nulla tenetur.
    </v-col>
  </v-row>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { Quiz } from '@/components';
  export default defineComponent({
    components: {
      Quiz
    },
    setup() {
      const showQuiz = ref(false);

      return {
        showQuiz
      };
    }
  });
</script>
