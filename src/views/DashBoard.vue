<template>
  <v-row>
    <v-col cols="12">
      <h1 class="text-text">La nostra casa&hellip; si sta spegnendo</h1>
      <h3 class="text-primary">Quanto impatto ha il mezzo di trasporto che usi per spostarti? Scoprilo</h3>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12"
      sm="6"
      lg="7">
      <v-row>
        <v-col cols="12">
          <CO2Calculator title="Emissioni di CO₂"
            subtitle="Quanto hai inquinato per arrivare qui?"
            icon="mdi-sprout-outline" />
        </v-col>

        <v-col cols="12">
          <ClimateClock title="Siamo in ritardo"
            subtitle="Quanto tempo ci manca"
            icon="mdi-leaf-circle-outline" />
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12"
      sm="6"
      lg="5">
      <GaiaFeed title="Gaia Feed"
        subtitle="Le ultime dal mondo"
        icon="mdi-leaf-circle-outline"
        color="background"
        :flat="true" />
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit corrupti eum reiciendis quia eaque tenetur maxime, deleniti necessitatibus autem voluptatem, alias impedit animi laborum repellendus cumque laboriosam hic eligendi vero!
    </v-col>
    <v-col>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque nulla voluptatem mollitia nesciunt. Itaque eaque, quae minus dicta quisquam quasi quidem consequuntur natus suscipit! Voluptas incidunt laborum ratione earum sunt!
    </v-col>
    <v-col>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde numquam quibusdam sint cum nesciunt expedita modi distinctio voluptate, itaque quisquam nobis in cupiditate voluptas et quam ad illo provident recusandae?
    </v-col>
  </v-row>

</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { CO2Calculator, GaiaFeed, ClimateClock } from '@/components';

  export default defineComponent({
    name: 'DashBoard',
    components: {
      CO2Calculator,
      GaiaFeed,
      ClimateClock
    },
  });
</script>
<style scoped lang="scss">
  .dashboard {
    display: grid;
    grid-template-columns: 60% 1fr;
    grid-template-rows: 1fr;
    gap: 2rem;
    grid-template-areas:"Left Right";

    &__right {
      grid-area: Right;
    }

    &__left {
      grid-area: Left;
    }
  }
</style>
