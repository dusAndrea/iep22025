<template>
  <v-card variant="outlined"
    class="pa-4 no-border">
    <v-card-title>Title</v-card-title>
    <v-card-text>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta a eum accusantium aperiam voluptatum, facere, corporis perspiciatis doloremque perferendis, ullam neque! Temporibus ratione architecto facere id ipsum! Necessitatibus, veniam molestiae.
    </v-card-text>
  </v-card>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'LineChart',
    props: {
      id: {
        type: String,
        required: false
      }
    },
    setup() {

      return {

      };
    }
  });
</script>
<style lang="scss" scoped>
.no-border {
  border: none
}
</style>
