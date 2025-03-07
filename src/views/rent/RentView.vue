<template>
  <!-- <Banner /> -->
  <div v-if="!isSmall" class="d-sm-none mt-16">
    <TrendingList :desktop="true" />
  </div>
  <div
    id="trending-container"
    :style="isSmall ? 'margin-top: 250px' : ''"
    style="position: relative; z-index: 2; background-color: #fff"
  >
    <v-container class="mx-auto px-4" style="max-width: 1200px">
      <template v-for="item in rentItems" :key="item?.rent_parent_id">
        <RentItems
          :title="item?.rent_parent_name"
          :rents="item?.rents"
          :buildings="buildings"
        />
      </template>
      <Interested class="mt-10 mb-16" />
    </v-container>
    <Footer />
  </div>
</template>

<script setup>
import "vue3-carousel/dist/carousel.css";

import Interested from "./partials/interested";
import { onMounted, ref, computed } from "vue";
import axios from "@/util/axios";
import TrendingList from "../TrendingList.vue";
import RentItems from "./partials/rentItems.vue";

const rentItems = ref([]);
const buildings = ref([
  {
    building_id: 1,
    building_name: "Pollux Habbie Tower 1",
  },
  {
    building_id: 2,
    building_name: "Pollux Habbie Tower 2",
  },
]);
const loader = ref(true);

const isSmall = computed(() => {
  return window.innerWidth < 640;
});

const getRentItems = () => {
  loader.value = true;
  axios
    .get(`/list-4walls-property-types`)
    .then((response) => {
      const data = response.data.data;
      rentItems.value = data
        .sort(function (a, b) {
          return a.property_type_id - b.property_type_id;
        })
        .map((item) => {
          return {
            rent_parent_id: item.property_type_id,
            rent_parent_name: item.property_name,
            rents: [
              {
                rent_id: 1,
                rent_name:
                  "Lovey 1 Bedroom in Pollux Habbie Tower 1, High Floor, Sea and City",
                type: "Condo",
                building: "Studio",
                bedQty: 1,
                bathQty: 1,
                address: "Batam Center, Batam, Indonesia",
                image: "80e2685508467d6bdae9aca6313348ff.jpg",
                active: "Y",
                price: 50,
              },
              {
                rent_id: 2,
                rent_name:
                  "Lovey 1 Bedroom in Pollux Habbie Tower 1, High Floor, Sea and City",
                type: "Condo",
                building: "Studio",
                bedQty: 1,
                bathQty: 1,
                address: "Batam Center, Batam, Indonesia",
                image: "80e2685508467d6bdae9aca6313348ff.jpg",
                active: "N",
                price: 50,
              },
              {
                rent_id: 3,
                rent_name:
                  "Lovey 1 Bedroom in Pollux Habbie Tower 1, High Floor, Sea and City",
                type: "Condo",
                building: "Studio",
                bedQty: 1,
                bathQty: 1,
                address: "Batam Center, Batam, Indonesia",
                image: "80e2685508467d6bdae9aca6313348ff.jpg",
                active: "N",
                price: 50,
              },
              {
                rent_id: 4,
                rent_name:
                  "Lovey 1 Bedroom in Pollux Habbie Tower 1, High Floor, Sea and City",
                type: "Condo",
                building: "Studio",
                bedQty: 1,
                bathQty: 1,
                address: "Batam Center, Batam, Indonesia",
                image: "80e2685508467d6bdae9aca6313348ff.jpg",
                active: "Y",
                price: 50,
              },
              {
                rent_id: 5,
                rent_name:
                  "Lovey 1 Bedroom in Pollux Habbie Tower 1, High Floor, Sea and City",
                type: "Condo",
                bedQty: 1,
                building: "Studio",
                bathQty: 1,
                address: "Batam Center, Batam, Indonesia",
                image: "80e2685508467d6bdae9aca6313348ff.jpg",
                active: "N",
                price: 50,
              },
            ],
          };
        });
      // let itemFinal = [];
    })
    .catch((error) => {
      // eslint-disable-next-line

      throw error;
    })
    .finally(() => {
      loader.value = false;
    });
};

const getBuildingItems = () => {
  loader.value = true;
  axios
    .get(`/list-four-walls-building-types`)
    .then((response) => {
      const data = response.data.data;
      buildings.value = data;
    })
    .catch((error) => {
      // eslint-disable-next-line

      throw error;
    })
    .finally(() => {
      loader.value = false;
    });
};

onMounted(() => {
  getRentItems();
  getBuildingItems();
});
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
</style>
