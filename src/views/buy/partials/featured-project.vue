<template>
  <div class="w-100">
    <div class="featured-title text-h5 text-md-h3 font-weight-black mb-4">
      New & Upcoming Projects
    </div>

    <div
      @click="resetList"
      class="mx-5 text-blue-darken-4 font-weight-bold mt-6 cursor-pointer"
    >
      Clear
    </div>
    <div class="mx-5 d-flex ga-5 mt-2 mb-3">
      <v-btn
        @click="() => filterList('2025')"
        class="text-red-darken-2"
        :class="selectedYear === '2025' ? 'bg-grey-lighten-2' : undefined"
        >2025</v-btn
      >
      <v-btn
        @click="() => filterList('2026')"
        class="text-red-darken-2"
        :class="selectedYear === '2026' ? 'bg-grey-lighten-2' : undefined"
        >2026</v-btn
      >
      <v-btn
        @click="() => filterList('2027')"
        class="text-red-darken-2"
        :class="selectedYear === '2027' ? 'bg-grey-lighten-2' : undefined"
        >2027</v-btn
      >
    </div>

    <Carousel v-bind="settings" :breakpoints>
      <Slide v-for="(data, i) in filteredData" :key="data.development_id">
        <v-hover v-slot:default="{ isHovering, props }">
          <v-responsive class="rounded pa-sm-2 align-start">
            <v-container class="rounded">
              <v-img
                :src="$fileURL + data?.main_image"
                cover
                style="height: 100%"
                aspect-ratio="1.1"
                @click="goToDetail(data)"
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
                  <img
                    :src="$fileURL + data?.partner_logo"
                    style="height: 30px"
                  />
                  <div class="font-weight-bold text-body-1">
                    {{ data?.partner_name }}
                  </div>
                </div>
                <!-- <div class="font-weight-bold text-body-1 text-left my-2">
                  {{ data?.project_header }}
                </div>
                <div class="text-body-2 font-weight-light text-left">
                  {{ data?.project_description }}
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
  </div>
</template>

<script setup>
import axios from "@/util/axios";
import { computed, onMounted, ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import { useStore } from "vuex";

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
    itemsToShow: 3,
    snapAlign: "left",
    wrapAround: true,
  },
});

const store = useStore();

const router = useRouter();

const selectedYear = ref(null);
const listData = ref([]);
const filteredData = ref([]);

const activeCity = computed(() => store.state.activeCity);

function getList() {
  listData.value = [];
  filteredData.value = [];
  axios
    .get(
      activeCity.value?.city_id
        ? `/list-4walls-property-developments/${activeCity.value?.country_id ? activeCity.value?.country_id : null}/${activeCity.value?.city_id ? activeCity.value?.city_id : null}`
        : `/list-4walls-property-developments/${activeCity.value?.country_id ? activeCity.value?.country_id : null}`,
    )
    .then((response) => {
      const data = response.data.data;
      console.log(data);
      listData.value = data.map((item) => ({
        ...item,
        // img: item.town_image,
        // city: item.town_name,
        // properties: 2,
      }));
      filteredData.value = listData.value;
    })
    .catch((error) => {
      // eslint-disable-next-line
      throw error;
    });
}

watchEffect(() => {
  getList();
});

function filterList(year) {
  selectedYear.value = year;
  filteredData.value = listData.value.filter(
    (item) => item.completion_year === year,
  );
}

function resetList() {
  selectedYear.value = null;
  filteredData.value = listData.value;
}

function goToDetail(data) {
  router.push(`/buy/${data.development_id}`);
}

onMounted(() => {
  getList();
});
</script>

<style scoped></style>
