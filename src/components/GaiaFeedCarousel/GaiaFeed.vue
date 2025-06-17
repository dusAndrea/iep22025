<template>
  <v-carousel v-if="feeds.length"
    :continuous="true"
    :show-arrows="true"
    delimiter-icon="mdi-square"
    height="300"
    hide-delimiter-background>
    <v-carousel-item v-for="(feed, index) in feeds"
      :key="index">
      <GaiaFeedArticle :key="index"
        :article="feed" />
    </v-carousel-item>
  </v-carousel>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import GaiaFeedArticle from './GaiaFeedArticles.vue';
  import { useFeedsStore } from '@/stores';
  import { storeToRefs } from 'pinia';
  import type { FeedType } from '@/types';
  import { useMessagesStore } from '@/stores';

  export default defineComponent({
    name: 'GreenFeed',
    components: {
      GaiaFeedArticle
    },
    setup() {
      const feedStore = useFeedsStore();
      const feeds = ref([] as FeedType[]);
      const { getFeeds } = storeToRefs(feedStore);
      const messagesStore = useMessagesStore();

      const fetchFeeds = async () => {
        if (!getFeeds.value.length) {
          try {
            await feedStore.fetchFeeds();
          } catch (error: any) {
            messagesStore.showMessage(error.message, 'error');
          }
        }
        feeds.value = getFeeds.value;
      };

      onMounted(() => {
        fetchFeeds();
      });

      return {
        fetchFeeds,
        feeds,
      };
    }

  });
</script>
