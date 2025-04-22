<template>
  <v-app-bar app
    color="primary"
    dark
    elevation="6">
    <v-app-bar-nav-icon></v-app-bar-nav-icon>

    <v-toolbar-title class="text-h6 font-weight-bold">
      <v-img :width="300"
        aspect-ratio="16/9"
        cover
        src="@/assets/logo.png" />
      <img alt="Vue logo"
        class="logo"
        src="@/assets/logo.png"
        width="125"
        height="125" />
    </v-toolbar-title>

    <v-spacer />

    <v-btn icon>
      <v-icon>mdi-home</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon>mdi-information</v-icon>
    </v-btn>

    <v-divider class="mx-4"
      vertical></v-divider>

    <v-icon class="mr-2">mdi-white-balance-sunny</v-icon>
    <v-switch v-model="isDark"
      color="secondary"
      inset
      hide-details
      :label="isDark ? 'Dark' : 'Light'"></v-switch>
    <v-icon class="ml-2">mdi-weather-night</v-icon>
  </v-app-bar>
</template>

<script setup>
  import { useTheme } from 'vuetify'
  import { ref, watch } from 'vue'

  const theme = useTheme()
  const isDark = ref(theme.global.current.value === 'sustainabilityDarkTheme')

  watch(isDark, (val) => {
    theme.global.name.value = val ? 'sustainabilityDarkTheme' : 'sustainabilityTheme'
  })
</script>

<style scoped>
  .v-app-bar {
    transition: background-color 0.3s ease;
  }
</style>
