<template>
  <v-card class="pa-4">
    <v-card-title>🌱 Ultime novità green</v-card-title>
    <v-divider class="my-2" />
    <v-list>
      <v-list-item v-for="article in articles"
        :key="article.id"
        :href="article.link"
        target="_blank"
        rel="noopener">
        <v-list-item-content>
          <v-list-item-title class="font-weight-medium">
            {{ article.title }}
          </v-list-item-title>
          <v-list-item-subtitle>{{ article.summary }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-icon>
          <v-icon color="green">mdi-open-in-new</v-icon>
        </v-list-item-icon>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  interface Article {
    id: number;
    title: string;
    summary: string;
    link: string;
  }

  const articles = ref<Article[]>([
    {
      id: 1,
      title: "L’Italia guida l’Europa sull’energia solare",
      summary: "Nel 2025 si prevede un incremento del 35% della produzione solare.",
      link: "https://www.esempio.it/articolo1"
    },
    {
      id: 2,
      title: "Startup crea plastica biodegradabile da alghe",
      summary: "Un nuovo materiale promette di ridurre i rifiuti plastici.",
      link: "https://www.esempio.it/articolo2"
    },
    {
      id: 3,
      title: "Auto elettriche: le batterie diventano riciclabili",
      summary: "Innovazioni nella gestione delle batterie al litio.",
      link: "https://www.esempio.it/articolo3"
    }
  ]);
</script>

<style scoped>
  .v-list-item {
    transition: background-color 0.2s;
  }

  .v-list-item:hover {
    background-color: #f0f9f1;
  }
</style>
