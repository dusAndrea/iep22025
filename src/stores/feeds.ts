import { defineStore } from 'pinia';
import type { FeedType } from '@/types';
import axios from 'axios';

export const useFeedsStore = defineStore('feeds', {
  state: () => ({
    feeds: [] as Array<FeedType>,
  }),
  persist: true,
  getters: {
    getFeeds: (state) => state.feeds
  },
  actions: {
    async fetchFeeds() {
      const API_KEY = '46094e7ced644eb0a3ac887f94fb61c5';
      const GREEN_URL = 'https://newsapi.org/v2/everything';

      try {
        const response = await axios.get(GREEN_URL, {
          params: {
            q: 'green sustainability climate innovation',
            language: 'en',
            sortBy: 'relevancy',
            pageSize: 10,
            apiKey: API_KEY
          },
        });

        this.feeds = response.data.articles;
      } catch (err: any) {
        throw new Error('Errore nel caricamento degli articoli');
      }
    },

    clearFeeds() {
      this.feeds = [];
    },
  }
});
