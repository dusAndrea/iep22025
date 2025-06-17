<template>
  <v-card v-if="article"
    color="background"
    flat>
    <div class="d-flex flex-no-wrap justify-space-between">
      <v-avatar class="ma-3"
        rounded="0"
        size="80">
        <v-img cover
          aspect-ratio="16/9"
          :src="article.urlToImage"
          tile></v-img>
      </v-avatar>

      <div class="d-flex flex-column">
        <h6 class="text-subtitle-2 font-weight-bold">
          <a :href="article.url"
            target="_blank"
            class="text-text ml-auto">
            {{ article.title }}
          </a>
        </h6>
        <p class="ml-auto">
          <small>scritto da&nbsp;</small>
          <span class="text-text font-italic">{{ article.author }}</span>
        </p>
      </div>
    </div>
  </v-card>
  <v-card v-else
    color="background"
    flat>
    <div class="d-flex align-center">
      <v-avatar class="ma-3"
        rounded="0"
        size="80">
        <v-img cover
          aspect-ratio="16/9"
          src="https://placehold.co/600x400?text=Oh+No"
          tile></v-img>
      </v-avatar>

      <div class="d-flex flex-column">
        <h6 class="text-subtitle-2 font-weight-bold">Nessuna news</h6>
      </div>
    </div>
  </v-card>
</template>
<script lang="ts">
  import { defineComponent, type PropType } from 'vue';
  import type { FeedType } from '@/types';

  export default defineComponent({
    name: 'GaiaFeedArticle',
    props: {
      article: {
        type: Object as PropType<FeedType>,
      }
    },
  });
</script>
