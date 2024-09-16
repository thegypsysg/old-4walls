<template>
  <div>
    <div class="d-flex gap-2 justify-center ga-3 mt-12">
      <span class="mdi mdi-office-building-outline"></span>
      <span>FEATURED MOVE-In PROJECTS</span>
    </div>
    <div class="featured-title text-h4 text-md-h3 text-center mt-6">
      READY TO MOVE IN PROJECTS IN BATAM
    </div>

    <div class="featured-sub-title text-center text-grey-darken-1 mt-6">
      CANT WAIT ? EAGER TO BY A PROPERTI IMMEDIATELY
    </div>

    <v-row justify="center" class="my-6">
      <transition-group name="card-transition" mode="out-in">
        <template v-for="(data, i) in listData" :key="i">
          <v-col cols="12" md="4">
            <v-hover v-slot:default="{ isHovering, props }">
              <v-container class="rounded">
                <v-img :src="data.img" cover style="height: 100%" aspect-ratio="1">
                  <div v-bind="props" :style="[
                    isHovering
                      ? 'background-color: rgba(0, 0, 0, 0.0)'
                      : 'background-color: rgba(0, 0, 0, 0.3)',
                    'transition: background-color 0.3s ease',
                  ]" class="fill-height pa-6 text-white font-weight-light">
                  </div>
                </v-img>
                <div class="d-flex flex-column ga-2 mt-2">
                  <div class="font-weight-bold text-body-2">{{ data.name }}</div>
                  <div class="text-body-2">{{ data.apartment.sale }} Apartments for Sale</div>
                  <div class="text-body-2">{{ data.apartment.rent }} Apartments for Rent</div>
                </div>
              </v-container>
            </v-hover>
          </v-col>
        </template>
      </transition-group>
    </v-row>
    <div class="w-100 d-flex justify-center mt-6">
      <v-btn class="bg-black">
        View More
        <v-icon right class="ml-4">mdi-plus</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">

const listData = [
  {
    img: 'https://pollux.co.id/wp-content/uploads/2020/09/pollux-skysuites-005-Podium-B_HIGHRES-1200x700-1.jpg',
    name: 'Pollux',
    apartment: {
      sale: 3,
      rent: 4
    },
  },
  {
    img: 'https://royalproperty.co.id/wp-content/uploads/2021/06/baloi-apartment-image-2.jpg',
    name: 'Baloi Apartments',
    apartment: {
      sale: 3,
      rent: 4
    },
  },
  {
    img: 'https://nagoyahillcondominium.com/wp-content/uploads/2023/02/untuk-web-home2-scaled.jpg',
    name: 'Nagoya Hill Condo',
    apartment: {
      sale: 3,
      rent: 4
    },
  },
]

</script>

<style scoped></style>
