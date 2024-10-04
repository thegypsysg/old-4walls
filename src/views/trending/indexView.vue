<template>
  <!-- <Banner /> -->

  <div id="trending-container" style="
      min-height: 100vh;
      position: relative;
      z-index: 2;
      background-color: #fff;
    ">

    <div class="d-none d-md-block mx-auto pt-16 pt-md-0 px-4 medium:px-20" style="max-width: 1200px; overflow-x: auto">
      <div class="d-flex justify-center ga-6 my-5" style="min-width: fit-content">
        <template v-for="n in trendings" :key="n">
          <v-btn :to="n.to" elevation="0" class="pa-2" style="min-width: 100px; min-height: 70px">
            <div class="d-flex flex-column align-center ga-3 text-caption">
              <v-responsive>
                <v-img :src="n.icon" cover style="height: 25px; width:25px;" aspect-ratio="1"></v-img>
              </v-responsive>
              {{ n.title }}
            </div>
          </v-btn>
        </template>
      </div>
    </div>

    <div class="text-center mt-6 mb-3 text-h4 text-md-h3 satisfy-regular">Buy Your Dream Home</div>
    <div class=" text-center text-h4 font-weight-black">In <span class="text-red-darken-4">Batam</span></div>

    <v-container class="mx-auto px-4" style="max-width: 1400px">
      <Slider />
    </v-container>
    <div class="mx-auto px-10 w-100">
      <FeaturedProject />
    </div>

    <v-container class="mx-auto px-4 medium:px-16" style="max-width: 1200px">
      <FeaturedMove />
      <Interested class="mt-10" />
      <Portfolio class="mt-10" />
    </v-container>

    <v-container class="mx-auto px-4" style="max-width: 1400px">
      <ForSale class="mt-10" />
    </v-container>

    <v-container class="mx-auto px-4 medium:px-16" style="max-width: 1200px">
      <Guide class="mt-10" />
    </v-container>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css'

import Banner from './partials/banner'
import Slider from './partials/slider'
import FeaturedProject from './partials/featured-project'
import FeaturedMove from './partials/featured-move'
import Interested from './partials/interested'
import Portfolio from './partials/portfolio'
import ForSale from './partials/for-sale'
import Guide from './partials/guide'

const trendings = [
  {
    icon: '/svg/house.svg',
    title: 'Buy',
    to: '/buy'
  },
  {
    icon: '/svg/house.svg',
    title: 'Rent',
    to: '/rent'
  },
  {
    icon: '/svg/house.svg',
    title: 'Roommates',
    to: '/roommates'
  },
  {
    icon: '/svg/house.svg',
    title: 'Staycation',
    to: '/staycation'
  },
  {
    icon: '/svg/house.svg',
    title: 'Vacation',
    to: '/vacation'
  },
  {
    icon: '/svg/house.svg',
    title: 'Co Living',
    to: '/co-living'
  },
  {
    icon: '/svg/house.svg',
    title: 'Co Working',
    to: '/co-working'
  },
]

</script>

<style scoped>
.v-field--variant-filled .v-field__overlay {
  background-color: white !important;
}

.v-field__outline {
  display: none;
}

.carousel__prev {
  left: -33px;
}

.carousel__next {
  right: -33px;
}

.carousel__track {
  align-items: start;
}

.satisfy-regular {
  font-family: "Satisfy", cursive;
  font-weight: 400;
  font-style: normal;
}

#trending-container {
  margin-top: 105px;
}

@media (max-width: 959px) {
  #trending-container {
    margin-top: 240px;
  }
}
</style>
