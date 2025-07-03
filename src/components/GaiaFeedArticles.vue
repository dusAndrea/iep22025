<template>
  <v-card v-if="article"
    class="d-flex"
    elevation="1"
    rounderd="0">
    <v-avatar rounded="0"
      size="160">
      <v-img :src="article.urlToImage"
        alt="Article cover"
        cover>
        <template #placeholder>
          <v-skeleton-loader type="image"></v-skeleton-loader>
        </template>
      </v-img>
    </v-avatar>
    <div class="d-flex flex-column justify-space-between pa-3">
      <h6 class="text-body-1">
        <a class="text-text"
          target="_blank"
          :href="article.url">{{ article.title }}</a>
      </h6>

      <div class="d-flex flex-column align-end text-text text-body-2">
        <p class="font-weight-medium text-wrap">{{ article.author }}</p>
        <p>{{ getFormattedDate }}</p>
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
  import { defineComponent, type PropType, computed } from 'vue';
  import type { FeedType } from '@/types';

  export default defineComponent({
    name: 'GaiaFeedArticle',
    props: {
      article: {
        type: Object as PropType<FeedType>,
      }
    },
    setup(props) {
      const getFormattedDate = computed(() => {
        if (props.article?.publishedAt) {
          return new Date(props.article?.publishedAt).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            timeZone: 'UTC',
          });
        }
        return '';
      });
      return {
        getFormattedDate
      };
    }
  });
</script>
<style lang="scss" scoped>
.gaia-article-thumb {
  display: flex;
  height: 100%;


  &__img {
    width: 100px;
  }

  &__desc {
    display: flex;
    flex-direction: column;
    padding: 10px;
  }

  &__author {

  }

  &__title {

  }
}
</style>
