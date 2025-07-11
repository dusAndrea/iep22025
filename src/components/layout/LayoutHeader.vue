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

      <v-spacer class="d-block d-lg-none" />

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
            :color="link.color">{{ link.icon }}</v-icon>
          {{ link.text }}
        </v-btn>
      </div>

      <v-spacer class="d-none d-lg-block" />

      <!-- Desktop Toggle Theme -->
      <DesktopToggle :isDark="isDark"
        @toggleEvent="toggleTheme()" />

      <v-divider inset
        length="60px"
        class="mx-4 my-auto d-none d-lg-flex"
        vertical></v-divider>

      <v-icon-btn class="d-none d-lg-flex"
        icon="mdi-logout"
        size="large"
        variant="text"
        @click="logout" />

      <v-menu min-width="200px">
        <template v-slot:activator="{ props }">
          <v-btn icon
            v-bind="props">
            <v-avatar color="text"
              size="large">
              <span class="text-h6">{{ getShortDisplayName }}</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-card-text>
            <div class="mx-auto text-center">
              <v-avatar color="text">
                <span class="text-h5">{{ getShortDisplayName }}</span>
              </v-avatar>
              <h3>{{ getDisplayName }}</h3>
              <p class="text-caption mt-1">
                {{ getEmail }}
              </p>
              <v-divider class="my-3"></v-divider>
              <v-btn variant="text"
                rounded>
                <RouterLink to="/profile">Edit Account</RouterLink>
              </v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn variant="text"
                rounded>
                <RouterLink to="/#"
                  @click="logout">Logout</RouterLink>
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-menu>
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

          <v-list-item-title>
            <v-icon :style="{ color: link.color }">{{ link.icon }}</v-icon>
            {{ link.text }}
          </v-list-item-title>
        </v-list-item>

        <v-divider />

        <v-list-item>
          <v-list-item-title>

            <v-icon-btn icon="mdi-logout"
              variant="text"
              @click="logout" />
            Logout

          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <MobileToggle :isDark="isDark"
      @toggleEvent="toggleTheme()" />
  </template>
</template>

<script lang="ts">
  import { useTheme } from 'vuetify';
  import { ref, defineComponent, computed } from 'vue';
  import lightLogo from '@/assets/logo_nobg_light.png';
  import darkLogo from '@/assets/logo_nobg_dark.png';
  import { useUserStore, useFeedsStore } from '@/stores';
  import { storeToRefs } from 'pinia';
  import { useRouter } from 'vue-router';
  import { useRoute } from 'vue-router';
  import ResponsiveDesktop from '@/components/responsive/ResponsiveDesktop.vue';
  import ResponsiveMobile from '@/components/responsive/ResponsiveMobile.vue';

  export default defineComponent({
    components: {
      DesktopToggle: ResponsiveDesktop,
      MobileToggle: ResponsiveMobile
    },
    setup() {
      const theme = useTheme();
      const userStore = useUserStore();
      const { isLoggedIn } = storeToRefs(userStore);
      const router = useRouter();
      const route = useRoute();
      const feedsStore = useFeedsStore();
      const drawer = ref(false);
      const { getDisplayName, getEmail, getShortDisplayName } = storeToRefs(userStore);

      const links = computed(() => [
        {
          to: '/dashboard',
          text: 'Dashboard',
          icon: 'mdi-view-dashboard-outline',
          color: isDark.value ? 'accent' : 'text',
        },
        {
          to: '/wall',
          text: 'Wall',
          icon: 'mdi-newspaper-variant-outline',
          color: isDark.value ? 'accent' : 'text',
        },
        {
          to:
            '/assessment',
          text: 'Assessment',
          icon: 'mdi-help-circle-outline',
          color: isDark.value ? 'accent' : 'text',
        },
        {
          to: '/profile',
          text: 'Profile',
          icon: 'mdi-account-circle-outline',
          color: isDark.value ? 'accent' : 'text',
        },
        {
          to: '/about',
          text: 'About',
          icon: 'mdi-information-outline',
          color: isDark.value ? 'primary' : 'text',
        },
      ]);

      const isDark = computed(() => theme.global.name.value === 'dark');

      const imgPath = computed(() => theme.global.name.value === 'dark' ? darkLogo : lightLogo);

      const shortUserName = computed(() => {
        const words = getDisplayName?.value.split(" ");

        const firstLetters = words.map((word) => word[0]);

        return firstLetters.join("");
      });

      const logout = (() => {
        userStore.logout();
        feedsStore.clearFeeds();
        router.push({ name: 'login' });
      });

      const toggleTheme = () => {
        theme.global.name.value = isDark.value ? 'light' : 'dark';
      };

      return {
        links,
        route,
        drawer,
        imgPath,
        isDark,
        isLoggedIn,
        shortUserName,
        getDisplayName,
        getEmail,
        getShortDisplayName,
        logout,
        toggleTheme,
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
