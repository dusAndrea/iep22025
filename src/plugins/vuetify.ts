// src/plugins/vuetify.js
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import '@mdi/font/css/materialdesignicons.css';
import { md3 } from 'vuetify/blueprints';
import { VIconBtn } from 'vuetify/labs/VIconBtn';

export default createVuetify({
  blueprint: md3,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          background: '#F5FBEF',
          surface: '#FFFFFF',
          primary: '#388E3C',     // verde foresta
          secondary: '#689F38',   // verde oliva
          accent: '#00796B',      // acqua profonda
          info: '#4DD0E1',
          warning: '#F9A825',     // giallo ocra più visibile
          error: '#D32F2F',
          success: '#388E3C',
          text: '#1B5E20',
          quiz: '#D84315',        // terracotta (più soft di #FF5722)
        },
      },
      dark: {
        colors: {
          background: '#121212',
          surface: '#1E1E1E',
          primary: '#81C784',
          secondary: '#AED581',
          accent: '#26A69A',
          info: '#4DD0E1',
          warning: '#FBC02D',
          error: '#EF5350',
          success: '#66BB6A',
          text: '#E0F2F1',
          quiz: '#FF8A65',
        },
      }
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
