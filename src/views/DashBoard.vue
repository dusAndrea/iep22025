<template>
  <v-row>
    <v-col cols="12">
      <h1 class="text-text">La nostra casa&hellip; si sta spegnendo</h1>
      <h3 class="text-primary">Sai davvero quanta CO₂ emetti quando ti sposti?</h3>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12">
      <DefaultCardWrapper>
        <template #cardContent>
          <v-row>
            <v-col>
              <CO2Calculator title="Emissioni di CO₂"
                subtitle="Quanto hai inquinato per arrivare qui?"
                icon="mdi-sprout-outline" />
            </v-col>

            <v-col>
              <ClimateClockCard title="Siamo in ritardo"
                subtitle="Quanto tempo ci manca"
                icon="mdi-leaf-circle-outline" />
            </v-col>
          </v-row>
        </template>
      </DefaultCardWrapper>
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
  import { CO2Calculator, ClimateClockCard, DefaultCardWrapper } from '@/components';
  export default defineComponent({
    name: 'DashBoard',
    components: {
      DefaultCardWrapper,
      CO2Calculator,
      ClimateClockCard
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
