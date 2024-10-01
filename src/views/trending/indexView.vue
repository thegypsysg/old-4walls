<template>
  <Banner />

  <div style="
      min-height: 100vh;
      position: relative;
      z-index: 2;
      background-color: #fff;
      margin-top: 100vh;
    ">

    <v-container class="mx-auto px-4 medium:px-16" style="max-width: 1200px;">
      <div class="w-100 d-flex justify-center ga-6 my-5">
        <template v-for="n in trendings" :key="n">
          <v-btn :to="n.title.toLowerCase().replaceAll(' ', '-')" elevation="0" class="pa-2"
            style="min-width: 100px; min-height: fit-content">
            <div class="d-flex flex-column align-center ga-3 text-caption">
              <v-responsive>
                <v-img :src="n.icon" cover style="height: 25px; width:25px;" aspect-ratio="1"></v-img>
              </v-responsive>
              {{ n.title }}
            </div>
          </v-btn>
        </template>
      </div>
    </v-container>

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
    title: 'Buy'
  },
  {
    icon: '/svg/house.svg',
    title: 'Rent'
  },
  {
    icon: '/svg/house.svg',
    title: 'Roommates'
  },
  {
    icon: '/svg/house.svg',
    title: 'Staycation'
  },
  {
    icon: '/svg/house.svg',
    title: 'Vacation'
  },
  {
    icon: '/svg/house.svg',
    title: 'Co Living'
  },
  {
    icon: '/svg/house.svg',
    title: 'Co Working'
  },
]

</script>

<style>
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
</style>
