<template>
  <Banner />
  <div style="
      min-height: 100vh;
      position: relative;
      z-index: 2;
      background-color: #fff;
      margin-top: 100vh;
    ">
    <v-container class="mx-auto px-4 medium:px-16" style="max-width: 1200px">
      <Slider />
      <FeaturedProject />
      <FeaturedMove />
      <Interested class="mt-10" />
    </v-container>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Banner from './partials/banner'
import Slider from './partials/slider'
import FeaturedProject from './partials/featured-project'
import FeaturedMove from './partials/featured-move'
import Interested from './partials/interested'

</script>

<style scoped></style>
