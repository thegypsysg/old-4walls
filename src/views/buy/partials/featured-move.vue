<template>
  <div>
    <div class="featured-title text-h5 text-md-h4 mb-6">
      READY TO MOVE IN PROJECTS IN
      {{
        activeCity?.city_name
          ? activeCity?.city_name.toUpperCase()
          : activeCity?.country_name.toUpperCase()
      }}
    </div>
    <div
      @click="resetList"
      class="mx-5 text-blue-darken-4 font-weight-bold mt-6 cursor-pointer"
    >
      Clear
    </div>

    <div class="mx-5 d-flex flex-wrap ga-5 mt-2">
      <template v-for="(data, i) in buildingTypes" :key="i">
        <v-btn class="text-red-darken-2" @click="filterList(data.bt_id)">{{
          data.building_type
        }}</v-btn>
      </template>
    </div>

    <!-- <v-row justify="center" class="my-3">
      <transition-group name="card-transition" mode="out-in">
        <template v-for="(data, i) in filteredData" :key="i">
          <v-col cols="12" md="4"> -->
    <Carousel v-bind="settings" :breakpoints>
      <Slide v-for="(data, i) in filteredData" :key="data.development_id">
        <v-hover v-slot:default="{ isHovering, props }">
          <v-responsive class="rounded pa-sm-2 align-start">
            <v-container class="pa-0">
              <v-img
                :src="$fileURL + data.img"
                cover
                style="height: 100%"
                aspect-ratio="1.5"
                class="rounded elevation-5"
              >
                <div
                  v-bind="props"
                  :style="[
                    isHovering
                      ? 'background-color: rgba(0, 0, 0, 0.0)'
                      : 'background-color: rgba(0, 0, 0, 0.3)',
                    'transition: background-color 0.3s ease',
                  ]"
                  class="fill-height pa-6 text-white font-weight-light"
                ></div>
              </v-img>
              <div class="d-flex flex-column ga-2 mt-2">
                <div class="font-weight-bold text-body-1">
                  {{ data.name }}
                </div>
                <!-- <div class="d-flex ga-2 justify-space-between">
                    <div class="text-orange">{{ data.price }}</div>
                    <div class="d-flex ga-2" style="color: #636363">
                      <div class="d-flex ga-3">
                        <div class="d-flex ga-1 align-center">
                          <v-icon icon="mdi-bed-king-outline" color="#636363" />
                          <div class="text-md-body-2">
                            {{ data.bedrooms }}
                          </div>
                        </div>
                        <div class="d-flex ga-1 align-center">
                          <v-icon icon="mdi-shower-head" color="#636363" />
                          <div class="text-md-body-2">{{ data.bathrooms }}</div>
                        </div>
                      </div>
                      <div class="d-flex ga-1 align-center">
                        <v-icon icon="mdi-ruler-square" color="#636363" />
                        <div class="text-md-body-2">
                          {{ data.area }}
                        </div>
                      </div>
                    </div>
                  </div> -->
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
    <!-- </v-col>
        </template>
      </transition-group>
    </v-row> -->
    <!-- <div class="w-100 d-flex justify-center mt-6">
      <v-btn class="bg-black">
        View More
        <v-icon right class="ml-4">mdi-plus</v-icon>
      </v-btn>
    </div> -->
  </div>
</template>

<script setup>
import axios from "@/util/axios";
import { useStore } from "vuex";
import { computed, onMounted, ref, watchEffect } from "vue";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

const settings = ref({
  itemsToShow: 1,
  snapAlign: "center",
});

const breakpoints = ref({
  // 200px and up
  200: {
    itemsToShow: 1,
    snapAlign: "left",
    wrapAround: true,
  },
  // 640px and up
  768: {
    itemsToShow: 2,
    snapAlign: "left",
    wrapAround: true,
  },
  // 700px and up
  1024: {
    itemsToShow: 3.5,
    snapAlign: "left",
    wrapAround: true,
  },
});

const store = useStore();
const listData = ref([]);
const filteredData = ref([]);
const buildingTypes = ref([]);

const activeCity = computed(() => store.state.activeCity);

onMounted(() => {
  getConstructionByCity();
  getBuildingType();
});

function getConstructionByCity() {
  filteredData.value = [];
  listData.value = [];
  axios
    .get(
      `/list-4-walls-construction-masters/${activeCity.value?.country_id}/${activeCity.value?.city_id}?move_in=Y`,
    )
    .then((response) => {
      const data = response.data.data;
      console.log(data);
      listData.value = data.map((item) => {
        return {
          img: item?.main_image,
          name: item?.construction_name,
          price: item?.price,
          bt_id: item?.bt_id,
          bedrooms: item?.construction_apartments[0]
            ? item?.construction_apartments[0]?.bedrooms
            : "-",
          bathrooms: item?.construction_apartments[0]
            ? item?.construction_apartments[0]?.bathrooms
            : "-",
          area: item?.construction_apartments[0]
            ? item?.construction_apartments[0]?.area
            : "-",
        };
      });
      filteredData.value = listData.value;
    })
    .catch((error) => {
      console.log(error);
    });
  // }
}

watchEffect(() => {
  getConstructionByCity();
});

function getBuildingType() {
  axios.get(`/list-four-walls-building-types`).then((response) => {
    buildingTypes.value = response.data.data;
  });
}

function resetList() {
  filteredData.value = listData.value;
}

function filterList(bt_id) {
  console.log(bt_id);
  filteredData.value = listData.value.filter((item) => item.bt_id === bt_id);
  console.log(filteredData.value);
}

// var listData = [
//   {
//     img: 'https://pollux.co.id/wp-content/uploads/2020/09/pollux-skysuites-005-Podium-B_HIGHRES-1200x700-1.jpg',
//     name: 'Pollux',
//     price: '$3,600/mo',
//     bed: 4,
//     shower: 2,
//     area: 1200,
//     apartment: {
//       sale: 3,
//       rent: 4
//     },
//   },
//   {
//     img: 'https://royalproperty.co.id/wp-content/uploads/2021/06/baloi-apartment-image-2.jpg',
//     name: 'Baloi Apartments',
//     price: '$540,000',
//     bed: 4,
//     shower: 2,
//     area: 1200,
//     apartment: {
//       sale: 3,
//       rent: 4
//     },
//   },
//   {
//     img: 'https://nagoyahillcondominium.com/wp-content/uploads/2023/02/untuk-web-home2-scaled.jpg',
//     name: 'Nagoya Hill Condo',
//     price: '2,800/mo',
//     bed: 4,
//     shower: 2,
//     area: 1200,
//     apartment: {
//       sale: 3,
//       rent: 4
//     },
//   },
// ]
</script>

<style scoped></style>
