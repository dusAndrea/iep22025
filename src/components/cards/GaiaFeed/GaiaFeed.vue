<template>
  <DefaultCardWrapper :title="title"
    :subtitle="subtitle"
    :color="color">
    <template #cardContent>
      <Transition>
        <div v-if="articles.length">

          <GaiaFeedArticle v-for="(article, key) in articles"
            :key="key"
            :article="article"></GaiaFeedArticle>

        </div>
        <div v-else>
          <GaiaFeedArticle />
        </div>
      </Transition>
    </template>
  </DefaultCardWrapper>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref, type PropType } from 'vue';
  import GaiaFeedArticle from './GaiaFeedArticles.vue';
  import { useFeedsStore } from '@/stores';
  import { storeToRefs } from 'pinia';
  import DefaultCardWrapper from '../DefaultCardWrapper.vue';
  import type { ColorAvailable } from '@/types';
  import { useMessagesStore } from '@/stores';

  export default defineComponent({
    name: 'GreenFeed',
    components: {
      DefaultCardWrapper,
      GaiaFeedArticle
    },
    props: {
      title: {
        type: String,
        required: true
      },
      subtitle: {
        type: String,
        required: true
      },
      color: {
        type: String as PropType<ColorAvailable>,
      }
    },
    setup() {
      const feedStore = useFeedsStore();
      const articles = ref([]);
      const { getFeeds } = storeToRefs(feedStore);
      const messagesStore = useMessagesStore();

      const fetchFeeds = async () => {
        if (!getFeeds.value.length) {
          try {
            await feedStore.fetchFeeds();
          } catch (error: any) {
            messagesStore.showMessage(error.message);
          }
        }
        articles.value = getFeeds.value;
      };

      onMounted(() => {
        fetchFeeds();
      });

      return {
        fetchFeeds,
        articles,
      };
    }

  });
</script>
