<template>
  <v-app class="fill-width fill-height">
    <!-- <Navbar v-if="isLoggedIn" /> -->
    <Navbar />
    <!-- <header>
        <img alt="Vue logo"
          class="logo"
          src="@/assets/logo.png"
          width="125"
          height="125" />

        <div class="wrapper">
          <HelloWorld msg="You did it!" />

          <nav>
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/about">About</RouterLink>
          </nav>
        </div>
      </header> -->

    <v-main>
      <GlobalSnackbar />
      <RouterView />
    </v-main>
  </v-app>
</template>
<script lang="ts">
  import { RouterView } from 'vue-router';
  import { Navbar, GlobalSnackbar } from '@/components/';
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'App',
    components: {
      Navbar,
      RouterView,
      GlobalSnackbar
    },
    setup() {

    }
  });
</script>
