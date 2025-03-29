<script setup>
import { onMounted, ref, nextTick, computed, watch } from "vue";
import { useStore } from "vuex";
import axios from "@/util/axios";
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import "@splidejs/vue-splide/css";
import { appId, fileURL } from "../main";

defineProps({
  desktop: Boolean,
});

const store = useStore();

const activeCity = computed(() => store.state.activeCity);
const selectedPlace = computed(() => store.state.selectedPlace);

const splideOptions = {
  perPage: 9,
  arrows: true,
  pagination: false,
  gap: "2rem",
  breakpoints: {
    640: {
      perPage: 4,
    },
    960: {
      perPage: 7,
    },
    1200: {
      perPage: 10,
    },
  },
};

const splideRef = ref(null);
const isBeginning = ref(true);
const isEnd = ref(false);
const isZero = ref(false);
const propertyName = ref(null);

const menuLists = ref([]);

const formatName = (name) => name.toLowerCase().replace(/\s+/g, "");

// const scrollToSection = (sectionId) => {
//   console.log(sectionId);
//   const element = document.getElementById(sectionId);
//   if (element) {
//     element.scrollIntoView({ behavior: "smooth" });
//   }
// };

function scrollToSection(sectionId, mobile, data) {
  console.log(data);
  if (data?.properties_count == 0) {
    isZero.value = true;
    propertyName.value = data?.property_name;
    return false;
  }
  const cardSection = document.getElementById(sectionId);

  // this.$nextTick(() => {
  if (cardSection) {
    const cardRect = cardSection.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const offset = mobile
      ? cardRect.top + scrollTop - 300
      : cardRect.top + scrollTop - 50; // Nilai offset yang diinginkan, dalam piksel

    window.scrollTo({
      top: offset,
      behavior: "smooth",
    });
  }
  // });
  // window.scrollBy(0, -scrollOffset);
}

const goNext = () => {
  splideRef.value?.splide?.go("+1");
};

const goPrev = () => {
  splideRef.value?.splide?.go("-1");
};

const handleSlideMove = () => {
  const splide = splideRef.value?.splide;
  if (splide) {
    isBeginning.value = splide.index === 0;
    isEnd.value = splide.index >= splide.length - splide.options.perPage;
  }
};

const selectedTrending = computed(() => store.state.selectedTrending);

console.log("SELECTED CATEGORY", selectedTrending.value);

const getMenuListData = (cat, city) => {
  axios
    .get(
      `/list-4walls-property-types/${cat?.id ? cat.id : "-1"}/${city?.city_id}`,
    )
    .then((response) => {
      const data = response.data.data;
      menuLists.value = data.sort(function (a, b) {
        return a.property_type_id - b.property_type_id;
      });
      console.log(menuLists.value);
      // let itemFinal = [];
    })
    .catch((error) => {
      // eslint-disable-next-line

      throw error;
    });
};

watch(
  () => store.state.activeCity?.city_id,
  (newCityId, oldCityId) => {
    if (newCityId !== oldCityId) {
      getMenuListData(selectedTrending.value, activeCity.value); // Panggil API saat city_id berubah
    }
  },
  { immediate: true }, // Agar dipanggil saat komponen pertama kali dimuat
);

watch(
  () => store.state.selectedTrending?.id,
  (newCatId, oldCatId) => {
    if (newCatId !== oldCatId) {
      getMenuListData(selectedTrending.value, activeCity.value); // Panggil API saat city_id berubah
    }
  },
  { immediate: true }, // Agar dipanggil saat komponen pertama kali dimuat
);

onMounted(() => {
  nextTick(() => {
    const splide = splideRef.value?.splide;
    if (splide) {
      splide.on("moved mounted", handleSlideMove);
      handleSlideMove();
    }
  });
  // getMenuListData();
});
</script>

<template>
  <div
    v-if="!desktop"
    class="d-flex ga-6 overflow-x-auto flex-row scroll-menu scroll-cont"
  >
    <div
      v-for="menu in menuLists"
      :key="menu.category_id"
      class="d-flex align-center ga-4 flex-column"
    >
      <!-- <div
        @click="scrollToSection(formatName(menu.property_name), true, menu)"
        class="d-flex flex-column align-center border-black pa-2 rounded-lg"
      > -->
      <v-card
        @click="scrollToSection(formatName(menu.property_name), false, menu)"
        class="card-wrapper"
        elevation="3"
      >
        <v-avatar :size="60">
          <v-img aspect-ratio="1" cover :src="fileURL + menu.image"></v-img>
        </v-avatar>
        <p class="text-no-wrap d-flex align-center mt-2 text-caption">
          {{ menu.property_name }}
        </p>
        <p
          class="text-no-wrap d-flex align-center font-weight-bold text-caption"
        >
          <span
            :class="
              menu?.properties_count == 0
                ? 'text-red-darken-1'
                : 'text-blue-darken-3'
            "
            >{{ menu?.properties_count }}</span
          >
          &nbsp;
          <span> Properties</span>
        </p>
      </v-card>
      <!-- </div> -->
    </div>
  </div>

  <div v-if="desktop" class="explore-section d-none d-md-block pt-14 pb-12">
    <!-- <v-container> -->
    <div class="position-relative pt-14">
      <!-- <v-btn
        v-if="!isBeginning"
        icon
        class="custom-arrow prev-arrow"
        @click="goPrev"
      >
        <span class="arrow-icon">←</span>
      </v-btn> -->

      <Splide class="px-16" ref="splideRef" :options="splideOptions">
        <SplideSlide v-for="menu in menuLists" :key="menu.category_id">
          <v-card
            @click="
              scrollToSection(formatName(menu.property_name), false, menu)
            "
            class="card-wrapper"
            elevation="3"
          >
            <v-avatar :size="80">
              <v-img aspect-ratio="1" cover :src="fileURL + menu.image"></v-img>
            </v-avatar>
            <div class="card-title text-no-wrap">
              <span
                class="text-center text-caption text-no-wrap font-weight-bold"
                >{{ menu.property_name }}</span
              >
            </div>
            <div
              class="text-no-wrap d-flex align-center font-weight-bold text-caption mt-n2"
            >
              <span
                :class="
                  menu?.properties_count == 0
                    ? 'text-red-darken-1'
                    : 'text-blue-darken-3'
                "
                >{{ menu?.properties_count }}</span
              >
              &nbsp;
              <span> Properties</span>
            </div>
          </v-card>
        </SplideSlide>
      </Splide>

      <!-- <v-btn v-if="!isEnd" icon class="custom-arrow next-arrow" @click="goNext">
        <span class="arrow-icon">→</span>
      </v-btn> -->
    </div>
    <!-- </v-container> -->
  </div>
  <v-dialog v-model="isZero" persistent width="auto">
    <v-card width="350">
      <v-card-text class="">
        <p class="my-4">
          We don't have any {{ propertyName }} for
          {{ selectedTrending?.title || "Rent" }} in
          {{ activeCity?.city_name }}
        </p>
        <v-btn class="mb-4 w-100 bg-primary" @click="isZero = false">
          OK
        </v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.card-wrapper {
  margin: 0.5rem;
  overflow: hidden;
  background: transparent;
  transition: transform 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: none !important;
}

.card-wrapper:hover {
  transform: translateY(-4px);
}

.card-title {
  padding: 1rem;
  text-align: center;
}

.custom-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  background: white !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.prev-arrow {
  left: -20px;
}

.next-arrow {
  right: -20px;
}

.arrow-icon {
  font-size: 24px;
  line-height: 1;
}

.scroll-cont::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.scroll-cont {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
