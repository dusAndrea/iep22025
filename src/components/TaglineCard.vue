<template>
  <v-card flat
    max-width="100%"
    max-height="100%"
    :image="taglineImage"
    class="fill-height tagline-card">
    <div class="fill-height d-flex flex-column justify-space-around align-center">
      <h1 class="text-text text-h1 font-weight-bold">Gaia Data</h1>
      <h3 class="text-text text-h3">Ogni numero fa testo</h3>
    </div>
  </v-card>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import taglineImage from '@/assets/tagline_opacity.png';

  export default defineComponent({
    name: 'TaglineCard',
    components: {},
    setup() {

      return {
        taglineImage
      };
    }
  });
</script>
<style lang="scss">
.tagline-card {
  img {
    filter: opacity(0.3);
  }
}
</style>
