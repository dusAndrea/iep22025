// src/plugins/vuetify.js
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'
import { md3 } from 'vuetify/blueprints'

const sustainabilityTheme = {
  dark: false,
  colors: {
    background: '#F5FBEF',     // Verde chiarissimo
    surface: '#FFFFFF',
    primary: '#4CAF50',        // Verde sostenibile
    secondary: '#8BC34A',      // Verde più chiaro
    accent: '#009688',         // Blu acqua
    info: '#4DD0E1',
    warning: '#FFC107',
    error: '#FF5252',
    success: '#388E3C',
  }
}

const sustainabilityDarkTheme = {
  dark: true,
  colors: {
    background: '#1E1E1E',
    surface: '#2E2E2E',
    primary: '#81C784',
    secondary: '#A5D6A7',
    accent: '#26A69A',
    info: '#80DEEA',
    warning: '#FFB300',
    error: '#EF5350',
    success: '#66BB6A',
  }
}

export default createVuetify({
  blueprint: md3,
  theme: {
    defaultTheme: 'sustainabilityTheme',
    themes: {
      sustainabilityTheme,
      sustainabilityDarkTheme
    }
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})
