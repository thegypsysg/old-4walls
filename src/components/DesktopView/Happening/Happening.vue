<template>
  <div>
    <div class="d-flex gap-2 justify-center ga-3">
      <IconsOffice height="17" />
      <span>TRENDING CATEGORIES</span>
    </div>
    <!-- <div class="featured-title text-h4 text-md-h3 text-center mt-6">Our New Homes For Sale and Rent</div>
    <div class="featured-sub-title text-center text-grey-darken-1 mt-6">
      OUR PORTFOLIO INCLUDES
      HIGH-QUALITY
      VILLAS, SPACIOUS
      APARTMENTS,
      AND THOUGHTFULLY
      DESIGNED
      TOWNHOUSES.
    </div> -->

    <div class="d-none d-md-block">
      <v-row no-gutters>
        <v-col cols="6" md="4" class="d-flex flex-column pa-2">
          <Grid title="BUY" image="/images/7.jpg" :isSquare="false" />
        </v-col>

        <v-col cols="6" md="4" class="pa-2">
          <v-row>
            <v-col>
              <Grid title="RENT" image="/images/8.jpg" :isSquare="true" />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <Grid title="STAYCATION" image="/images/9.jpg" :isSquare="true" />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="6" md="4" class="pa-2">
          <v-row>
            <v-col>
              <Grid title="ROOMATES" image="/images/10.jpg" :isSquare="true" />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <Grid title="VACATION" image="/images/11.jpg" :isSquare="true" />
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12">
          <v-responsive aspect-ratio="3" style="width: 100%;" class="pa-0">
            <v-row style="height: 100%;" no-gutters>
              <v-col cols="6" md="4" style="height: 100%;" class="pa-2">
                <Grid title="CO LIVING" image="/images/13.jpg" :isSquare="false" />
              </v-col>
              <v-col cols="6" md="8" style="height: 100%;" class="pa-2">
                <Grid title="CO WORKING" image="/images/12.jpg" :isSquare="false" />
              </v-col>
            </v-row>
          </v-responsive>
        </v-col>

      </v-row>
    </div>
    <div class="d-md-none">
      <div id="trending-item" class="d-flex ga-2 py-3 w-100 px-2">
        <v-btn @click="show('all')" class="bg-white rounded-pill border-thin" elevation="0">View All</v-btn>
        <div class="flex-fill d-flex ga-2" id="scroll-trending">
          <v-btn @click="show('rent')" class="bg-white rounded-pill border-thin" elevation="0">Rent</v-btn>
          <v-btn @click="show('buy')" class="bg-white rounded-pill border-thin" elevation="0">Buy</v-btn>
          <v-btn @click="show('staycation')" class="bg-white rounded-pill border-thin" elevation="0">Staycation</v-btn>
          <v-btn @click="show('roomates')" class="bg-white rounded-pill border-thin" elevation="0">Roomates</v-btn>
          <v-btn @click="show('vacation')" class="bg-white rounded-pill border-thin" elevation="0">Vacation</v-btn>
          <v-btn @click="show('co-living')" class="bg-white rounded-pill border-thin" elevation="0">Co
            Living</v-btn>
          <v-btn @click="show('co-working')" class="bg-white rounded-pill border-thin" elevation="0">Co
            Working</v-btn>
        </div>
      </div>

      <v-row class="mt-4">
        <template v-for="(trend, i) in filterTrendings" :key="i">
          <v-col cols="6">
            <Grid :title="trend.title" :image="trend.image" :isSquare="true" />
          </v-col>
        </template>
      </v-row>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import Grid from './partials/grid.vue';

const filter = ref('all');
const trendings = [
  {
    type: 'buy',
    title: 'BUY',
    image: '/images/7.jpg',
    isSquare: true
  },
  {
    type: 'rent',
    title: 'RENT',
    image: '/images/8.jpg',
    isSquare: true
  },
  {
    type: 'staycation',
    title: 'STAYCATION',
    image: '/images/9.jpg',
    isSquare: true
  },
  {
    type: 'roomates',
    title: 'ROOMATES',
    image: '/images/10.jpg',
    isSquare: true
  },
  {
    type: 'vacation',
    title: 'VACATION',
    image: '/images/11.jpg',
    isSquare: true
  },
  {
    type: 'co-living',
    title: 'CO LIVING',
    image: '/images/12.jpg',
    isSquare: true
  },
  {
    type: 'co-working',
    title: 'CO WORKING',
    image: '/images/13.jpg',
    isSquare: true
  },
];

const filterTrendings = computed(() => {
  if (filter.value == 'all') { return trendings; }

  return trendings.filter((trending) => {
    return trending.type === filter.value;
  });
});

const show = async (type: string) => {
  const trending_elements = document.getElementsByClassName('trending');
  filter.value = type;

  await new Promise(resolve => setTimeout(resolve, 200));


  Array.from(trending_elements).forEach((element) => {
    element.classList.add('visible');
  });
}

onMounted(() => {
  const tcontainer = document.getElementById('trending-container')
  const titem = document.getElementById('trending-item')

  tcontainer.appendChild(titem)
})
</script>

<style scoped>
#scroll-trending {
  overflow-x: auto;
  overflow-x: auto;
  scrollbar-width: none;
  /* For Firefox */
  -ms-overflow-style: none;
}
</style>
