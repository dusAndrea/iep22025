<template>
  <template v-if="isLoggedIn">
    <v-app-bar app
      height="140"
      color="background"
      :collaspe="true"
      flat
      class="px-4">

      <v-app-bar-nav-icon @click="drawer = !drawer"
        class="d-md-none" />


      <RouterLink to="/">
        <v-img :width="140"
          aspect-ratio="16/9"
          cover
          :src="imgPath" />
      </RouterLink>

      <v-spacer />
      <!-- Desktop Links -->
      <div class="d-none d-md-flex mx-auto">
        <v-btn v-for="link in links"
          :key="link.to"
          :to="link.to"
          router
          exact
          class="mx-2 text-h5"
          :class="{ 'active-link': route.path === link.to }"
          variant="text">
          <v-icon start
            :style="{ color: link.color }">{{ link.icon }}</v-icon>
          {{ link.text }}
        </v-btn>
      </div>

      <v-spacer />

      <v-icon class="mr-2">mdi-white-balance-sunny</v-icon>

      <v-switch v-model="isDark"
        color="secondary"
        inset
        hide-details
        :label="isDark ? 'Dark' : 'Light'"></v-switch>
      <v-icon class="ml-2">mdi-weather-night</v-icon>

      <v-divider inset
        length="60px"
        class="mx-4 my-auto"
        vertical></v-divider>

      <v-icon-btn icon="mdi-logout"
        size="large"
        variant="text"
        @click="logout" />
    </v-app-bar>

    <!-- Drawer for mobile -->
    <v-navigation-drawer v-model="drawer"
      app
      temporary>
      <v-list>
        <v-list-item v-for="link in links"
          :key="link.to"
          :to="link.to"
          router
          exact
          :class="{ 'active-link': route.path === link.to }">
          <v-list-item-icon>
            <v-icon :style="{ color: link.color }">{{ link.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ link.text }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </template>
  <template v-else></template>
</template>

<script lang="ts">
  import { useTheme } from 'vuetify';
  import { ref, watch, defineComponent } from 'vue';
  import lightLogo from '@/assets/logo_nobg_light.png';
  import darkLogo from '@/assets/logo_nobg_light.png';
  import { useUserStore, useFeedsStore } from '@/stores';
  import { storeToRefs } from 'pinia';
  import { useRouter } from 'vue-router';
  import { useRoute } from 'vue-router';
  export default defineComponent({
    setup() {
      const theme = useTheme();
      const isDark = ref(theme.global.current.value === 'sustainabilityDarkTheme');
      const userStore = useUserStore();
      const { isLoggedIn } = storeToRefs(userStore);
      const router = useRouter();
      const route = useRoute();

      const feedsStore = useFeedsStore();
      const drawer = ref(false);

      const links = [
        // {
        //   to: '/',
        //   text: 'Home',
        //   icon: 'mdi-home',
        //   color: '#4CAF50', // Verde
        // },
        {
          to:
            '/quiz',
          text: 'Quiz',
          icon: 'mdi-help-circle-outline',
          color: '#FF5722'
        },
        {
          to: '/profile',
          text: 'Profile',
          icon: 'mdi-account-circle',
          color: '#E91E63'
        },
        // {
        //   to: '/news',
        //   text: 'News',
        //   icon: 'mdi-newspaper-variant-outline',
        //   color: '#2196F3', // Blu
        // },
        // {
        //   to: '/analytics',
        //   text: 'Analytics',
        //   icon: 'mdi-chart-line',
        //   color: '#FF9800', // Arancione
        // },
        // {
        //   to: '/map',
        //   text: 'Map',
        //   icon: 'mdi-map-marker-radius',
        //   color: '#9C27B0', // Viola
        // },
        {
          to: '/about',
          text: 'About',
          icon: 'mdi-information-outline',
          color: '#00BCD4', // Azzurro
        },
      ];


      let imgPath = lightLogo;

      const logout = (() => {
        userStore.logout();
        feedsStore.clearFeeds();
        router.push('/login');
      });

      watch(isDark, (val) => {
        theme.global.name.value = val ? 'sustainabilityDarkTheme' : 'sustainabilityTheme';
        imgPath = val ? darkLogo : lightLogo;
      });

      return {
        imgPath,
        isDark,
        isLoggedIn,
        logout,
        links,
        route,
        drawer
      };
    }
  })


</script>

<style lang="scss" scoped>
  .v-app-bar {
    transition: background-color 0.3s ease;
  }

  .nav-link {
    text-decoration: none;
    &.active-link {
      font-weight: bold;
      border-bottom: 2px solid white;
    }
  }

  .active-link {
  background-color: rgba(255, 255, 255, 0.15);
  border-radius: 8px;
}

.v-btn:hover .v-icon,
.v-list-item:hover .v-icon {
  filter: brightness(1.2);
  transform: scale(1.05);
  transition: all 0.2s ease;
}

</style>
