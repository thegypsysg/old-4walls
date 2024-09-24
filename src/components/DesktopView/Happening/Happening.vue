<template>
  <div>
    
    <p
      align="center"
      class="header-title mt-4"
      :class="isSmall ? 'cust-title-2' : 'cust-title-1'"
    >
      TRENDING CATEGORIES
    </p>
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
          <Grid :title="data[0]?.title" :image="`${$fileURL + data[0]?.image}`" :isSquare="false" />
        </v-col>

        <v-col cols="6" md="4" class="pa-2">
          <v-row>
            <v-col>
              <Grid :title="data[1]?.title" :image="`${$fileURL + data[1]?.image}`" :isSquare="true" />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <Grid :title="data[2]?.title" :image="`${$fileURL + data[2]?.image}`" :isSquare="true" />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="6" md="4" class="pa-2">
          <v-row>
            <v-col>
              <Grid :title="data[3]?.title" :image="`${$fileURL + data[3]?.image}`" :isSquare="true" />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <Grid :title="data[4]?.title" :image="`${$fileURL + data[4]?.image}`" :isSquare="true" />
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12">
          <v-responsive aspect-ratio="3" style="width: 100%;" class="pa-0">
            <v-row style="height: 100%;" no-gutters>
              <v-col cols="6" md="4" style="height: 100%;" class="pa-2">
                <Grid :title="data[5]?.title" :image="`${$fileURL + data[5]?.image}`" :isSquare="false" />
              </v-col>
              <v-col cols="6" md="8" style="height: 100%;" class="pa-2">
                <Grid :title="data[6]?.title" :image="`${$fileURL + data[6]?.image}`" :isSquare="false" />
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
          <template v-for="(item, index) in data" :key="index">
            <v-btn @click="show(item?.title)" class="bg-white rounded-pill border-thin" elevation="0">{{ item?.title }}</v-btn>
          </template>
        </div>
      </div>

      <v-row class="mt-4">
        <template v-for="(item, i) in data" :key="i">
          <v-col cols="6">
            <Grid :title="item?.title" :image="`/images/7.jpg`" :isSquare="true" />
          </v-col>
        </template>
      </v-row>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed, onMounted, watch } from 'vue';

import { eventBus } from "@/util/bus";
import Grid from './partials/grid.vue';
const props = defineProps<{
  data: Array<{ title: string; image: string; isSquare: boolean }>;
  isSmall: boolean;
}>();

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

const handleDataChange = () => {
  const tcontainer = document.getElementById('trending-container');
  const titem = document.getElementById('trending-item');

  if (tcontainer && titem) {
    tcontainer.appendChild(titem);
  }
  console.log("lukman", props.data);
};

onMounted(() => {
  handleDataChange();
});

watch(() => props.data, handleDataChange, { immediate: true });
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
