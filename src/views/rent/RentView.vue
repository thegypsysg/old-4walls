<template>
  <!-- <Banner /> -->
  <div v-if="!isSmall" class="mt-16">
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
          v-if="item?.rents?.length > 0"
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
const isLoading = ref(false);
const requestCount = ref(0);
const errorMessage = ref("");
const isError = ref(false);

const isSmall = computed(() => {
  return window.innerWidth < 640;
});

const getItemsData = async () => {
  isLoading.value = true;
  requestCount.value = 0; // Reset request count

  try {
    let data = await getRentTypes();
    console.log(data);
    rentItems.value = data.sort(
      (a, b) => a.property_type_id - b.property_type_id,
    );
    requestCount.value++;

    const updatedItems = await Promise.all(
      data.map(async (item) => {
        const rentItems = await getRentItemsByTypeId(item.property_type_id);
        requestCount.value++;
        return {
          ...item,
          rents: rentItems.map((data) => {
            return {
              ...data,
              rent_parent_id: item.rent_parent_id,
              rent_parent_name: item.rent_parent_name,
            };
          }),
        };
      }),
    );

    rentItems.value = updatedItems.sort((a, b) => a.id - b.id);
    // console.log(updatedItems);
  } catch (error) {
    console.error("Error fetching items data:", error);
  } finally {
    isLoading.value = false;
  }
};

const getRentTypes = async () => {
  isLoading.value = true;
  try {
    const response = await axios.get("/list-4walls-property-types");
    const data = response.data.data;

    return data
      .sort((a, b) => a.property_type_id - b.property_type_id)
      .map((item) => ({
        ...item,
        rent_parent_id: item.property_type_id,
        rent_parent_name: item.property_name,
        id: item.property_type_id || 0,
        name: item.property_name || "",
        image: item.image || "",
      }))
      .slice(0, 10);
  } catch (error) {
    console.error(error);
    errorMessage.value =
      error.response?.data?.message || "Something went wrong!!!";
    isError.value = true;
  } finally {
    isLoading.value = false;
  }
};

const getRentItemsByTypeId = async (id) => {
  try {
    const response = await axios.get(`/list-properties-by-property-type/${id}`);
    const data = response.data.data;
    return data.map((item) => ({
      ...item,
      rent_id: item?.property_id,
      rent_name: item?.tag_line,
      type: item?.button_name,
      bedQty: item?.bedrooms || 0,
      bathQty: item?.bathrooms || 0,
      address: `Static Town, Static City, ${item?.country_name}`,
      city: item?.city_name,
      image: item?.main_image,
      active: item?.active,
      featured: item?.featured,
      price: 50,
      video: item?.video_link || null,
    }));
  } catch (error) {
    console.error(error);
    throw error;
  }
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
  getItemsData();
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
