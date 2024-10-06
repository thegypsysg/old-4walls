<template>
  <div class="w-100">
    <div class="d-flex gap-2 justify-center ga-3 mt-12">
      <span class="mdi mdi-office-building-outline"></span>
      <span>FEATURED PROJECT</span>
    </div>
    <div class="featured-title text-h4 text-md-h3 text-center mt-6">
      EXPLORE NEW & UPCOMING PROJECTS IN BATAM
    </div>

    <div class="featured-sub-title text-center text-grey-darken-1 mt-6">
      READY TO INVEST IN OUR PORTFOLIO OF NEW PROJECTS FOR INVESTMENT OR
      RESIDENTIAL
    </div>

    <div class="mx-5 d-flex ga-5 mt-6 mb-3">
      <v-btn class="text-red-darken-2">2025</v-btn>
      <v-btn class="text-red-darken-2">2026</v-btn>
      <v-btn class="text-red-darken-2">2027</v-btn>
    </div>

    <Carousel v-bind="settings" :breakpoints>
      <Slide v-for="(data, i) in listData" :key="i">
        <v-hover v-slot:default="{ isHovering, props }">
          <v-responsive class="rounded pa-sm-2 align-start">
            <v-container class="rounded">
              <v-img
                :src="$fileURL + data?.main_image"
                cover
                style="height: 100%"
                aspect-ratio="1.1"
              >
                <!-- <div v-bind="props" :style="[
                  isHovering
                    ? 'background-color: rgba(0, 0, 0, 0.0)'
                    : 'background-color: rgba(0, 0, 0, 0.3)',
                  'transition: background-color 0.3s ease',
                ]" class="fill-height pa-6 text-white font-weight-light">
                </div> -->
                <div
                  class="d-flex flex-column justify-space-between align-start fill-height pa-4"
                >
                  <v-badge
                    v-if="data?.under_construction == 'Y'"
                    content="UNDER CONSTRUCTION"
                    inline
                    color="blue-darken-4"
                    rounded="0"
                    class="text-body-1 font-weight-bold"
                  ></v-badge>
                  <div
                    class="d-flex flex-column flex-md-row justify-space-between align-center ga-3"
                  >
                    <div class="text-center text-md-left text-white">
                      <div class="text-h4 font-weight-bold">
                        {{ data?.project_name }}
                      </div>
                      <div class="font-weight-bold text-h6">
                        {{ `${data?.town_name}, ${data?.city_name}` }}
                      </div>
                      <div class="text-body-1">
                        Completion
                        <span class="font-weight-bold">{{
                          `${data?.completion_month} ${data?.completion_year}`
                        }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </v-img>
              <div class="d-flex flex-column ga-2 mt-2">
                <div class="d-flex ga-2 align-center justify-start">
                  <img :src="$fileURL + data?.logo" style="height: 30px" />
                  <div class="font-weight-bold text-body-1">
                    {{ data?.partner_name }}
                  </div>
                </div>
                <div class="font-weight-bold text-body-1 text-left my-2">
                  {{ data?.project_header }}
                </div>
                <div class="text-body-2 font-weight-light text-left">
                  {{ data?.project_description }}
                </div>
              </div>
            </v-container>
          </v-responsive>
        </v-hover>
      </Slide>

      <template #addons>
        <Navigation />
        <Pagination />
      </template>
    </Carousel>
  </div>
</template>

<script setup>
import axios from "@/util/axios";
import { onMounted, ref } from "vue";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

const settings = {
  itemsToShow: 1,
  snapAlign: "center",
  wrapAround: true,
};

const breakpoints = {
  // 200px and up
  200: {
    itemsToShow: 1,
    snapAlign: "left",
  },
  // 640px and up
  768: {
    itemsToShow: 2,
    snapAlign: "left",
  },
  // 700px and up
  1024: {
    itemsToShow: 3,
    snapAlign: "left",
  },
};

// const listData = [
//   {
//     under_construction: true,
//     img: 'https://e-wanderlust.com/wp-content/uploads/elementor/thumbs/WHO-DO-WE-CATER-TO-qj4ugtpw3gef7tcuiexmakc2ptip72k61u8wqu53k0.jpg',
//     name: 'Opus Bay',
//     description: 'Our condos offer the perfect blend of luxury and practially. Located in some of the most sought-after locations in Batam, our condos offer easy access to all the amenities you need for a comfortable and convenient lifestyle.',
//     company: {
//       name: 'TUAN SING HOLDINGS UNITED',
//       caption: 'The Perfect Place to Live Your Dreams',
//       icon: 'https://media.licdn.com/dms/image/C5103AQEgthUJyEnmyw/profile-displayphoto-shrink_200_200/0/1521704086565?e=2147483647&v=beta&t=p0SmV73TJdS8w9RSTEAOdef0WM1JLLwhUb3l20KnEGU',
//       town: 'Sekupang, Batam',
//       completion: 'Dec 2025'
//     }
//   },
// ]

const listData = ref([]);

function getList() {
  axios
    // .get(`/towns/city/${itemSelected2}`)
    .get(`/list-4walls-property-developments/4/95`)
    .then((response) => {
      const data = response.data.data;
      console.log(data);
      listData.value = data.map((item) => ({
        ...item,
        // img: item.town_image,
        // city: item.town_name,
        // properties: 2,
      }));
    })
    .catch((error) => {
      // eslint-disable-next-line
      console.log(error);
      throw error;
    });
}

onMounted(() => {
  getList();
});
</script>

<style scoped></style>
