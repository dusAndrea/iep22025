<template>
  <v-card outlined
    :title="title"
    :color="color"
    :flat="flat"
    class="fill-height">
    <v-card-subtitle class="text-text">{{ subtitle }}</v-card-subtitle>
    <template v-slot:prepend>
      <v-icon size="x-large"
        color="success">{{ icon }}</v-icon>
    </template>
    <v-card-text>
      <slot name="cardContent"></slot>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
  import { defineComponent, type PropType } from 'vue';
  import type { ColorAvailable } from '@/types';

  export default defineComponent({
    props: {
      title: {
        type: String,
      },
      subtitle: {
        type: String,
      },
      color: {
        type: String as PropType<ColorAvailable>,
        required: false,
      },
      icon: {
        type: String
      },
      flat: {
        type: Boolean,
        default: false
      }
    },
    setup() {

    }
  });
</script>
