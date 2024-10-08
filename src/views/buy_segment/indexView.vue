<template>
  <!-- <Banner /> -->

  <div id="studio-container" style="
      min-height: 100vh;
      position: relative;
      z-index: 2;
      background-color: #f7f8f9;
  margin-top: 115px;
  ">
    <v-container>
      <v-row>
        <v-col class="d-flex flex-column flex-md-row justify-space-between">
          <div class="text-h4 font-weight-black">
            IDR: 10,000,000
          </div>
          <div>
            <v-badge color="black" content="FOR RENT" inline rounded="0" class="opacity-80" align="left" />
            <v-badge color="green" content="FOR RENT" inline rounded="0" class="opacity-80" align="left" />
          </div>
        </v-col>
        <v-col class="d-flex justify-end ga-3">
          <v-btn color="#f7f8f9" prepend-icon="mdi-tray-arrow-up" elevation="0">
            <template v-slot:prepend>
              <v-icon></v-icon>
            </template>
            Saved
          </v-btn>
          <v-btn color="#f7f8f9" prepend-icon="mdi-heart" elevation="0">
            <template v-slot:prepend>
              <v-icon color="red"></v-icon>
            </template>
            Saved
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-container class="d-none d-sm-block w-100">
      <v-row>
        <v-col cols="6" class="d-flex flex-column pa-2">
          <Grid title="Image" image="https://demo03.houzez.co/wp-content/uploads/2016/02/038-1170x877.jpg"
            :isSquare="false" />
        </v-col>

        <v-col cols="6" md="3" class="pa-2">
          <v-row>
            <v-col>
              <Grid title="Image" image="https://demo03.houzez.co/wp-content/uploads/2016/02/038-1170x877.jpg"
                :isSquare="true" />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <Grid title="Image" image="https://demo03.houzez.co/wp-content/uploads/2016/02/038-1170x877.jpg"
                :isSquare="true" />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="6" md="3" class="pa-2">
          <v-row>
            <v-col>
              <Grid title="Image" image="https://demo03.houzez.co/wp-content/uploads/2016/02/038-1170x877.jpg"
                :isSquare="true" />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <Grid title="Image" image="https://demo03.houzez.co/wp-content/uploads/2016/02/038-1170x877.jpg"
                :isSquare="true" />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <!-- MOBILE VIEW -->
    <v-container class="d-sm-none">
      <v-row>
        <template v-for="(item, i) in images" :key="i">
          <v-col cols="6">
            <Grid :title="item.title" :image="item.image" :isSquare="true" />
          </v-col>
        </template>
      </v-row>
    </v-container>

    <Overview class="mt-6" />
    <Description class="mt-6" />
    <Address class="mt-6" />
    <Video class="mt-6" />
    <Contact class="mt-6" />

    <Footer />
  </div>
</template>

<script setup>
import "vue3-carousel/dist/carousel.css";
import Grid from '@/components/DesktopView/Happening/partials/grid.vue';
import Overview from './partials/overview.vue';
import Description from './partials/description.vue';
import Address from './partials/address.vue';
import Video from './partials/video.vue';
import Contact from './partials/contact.vue';

const images = [
  {
    title: "Image",
    image: "https://demo03.houzez.co/wp-content/uploads/2016/02/038-1170x877.jpg",
  },
  {
    title: "Image",
    image: "https://demo03.houzez.co/wp-content/uploads/2016/02/038-1170x877.jpg",
  },
  {
    title: "Image",
    image: "https://demo03.houzez.co/wp-content/uploads/2016/02/038-1170x877.jpg",
  },
  {
    title: "Image",
    image: "https://demo03.houzez.co/wp-content/uploads/2016/02/038-1170x877.jpg",
  },
  {
    title: "Image",
    image: "https://demo03.houzez.co/wp-content/uploads/2016/02/038-1170x877.jpg",
  },
  {
    title: "Image",
    image: "https://demo03.houzez.co/wp-content/uploads/2016/02/038-1170x877.jpg",
  },
]

</script>

<style scoped></style>
