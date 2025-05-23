// src/plugins/vuetify.js
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import '@mdi/font/css/materialdesignicons.css';
import { md3 } from 'vuetify/blueprints';
import { VIconBtn } from 'vuetify/labs/VIconBtn';

const sustainabilityTheme = {
  dark: false,
  colors: {
    background: '#F5FBEF',  // Verde chiarissimo
    surface: '#FFFFFF',
    primary: '#A0D1A2',     // Verde sostenibile
    secondary: '#8BC34A',   // Verde più chiaro
    accent: '#009688',      // Blu acqua
    info: '#4DD0E1',
    warning: '#FFC107',
    error: '#FF5252',
    success: '#388E3C',
    text: '#034a43'
  },
  lighten: 5,
  darken: 5,
};

const sustainabilityDarkTheme = {
  dark: true,
  colors: {
    background: '#121212',
    surface: '#1E1E1E',
    primary: '#81C784',     // verde soft ma visibile su sfondo scuro
    secondary: '#AED581',   // verde lime più chiaro
    accent: '#26A69A',      // teal intenso per accent
    info: '#4DD0E1',
    warning: '#FFC107',
    error: '#EF5350',
    success: '#66BB6A',
    text: '#E0F2F1'         // quasi bianco con leggero tono verde acqua
  },
  lighten: 5,
  darken: 5,
};

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
  components: {
    VIconBtn
  }
});
