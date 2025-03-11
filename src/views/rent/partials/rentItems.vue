<script setup>
import { onMounted, ref, nextTick, onUnmounted, computed } from "vue";
import { fileURL } from "@/main";
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import "@splidejs/vue-splide/css";

const props = defineProps({
  desktop: Boolean,
  title: {
    type: String,
    default: "Bedroom",
  },
  rents: {
    type: Array,
    default: () => [],
  },
  buildings: {
    type: Array,
    default: () => [],
  },
  viewAll: {
    type: Boolean,
    default: false,
  },
});

const splideRef = ref(null);
const isBeginning = ref(true);
const isEnd = ref(false);
const isMobile = ref(false);
const selected = ref(null);

const splideOptions = computed(() => ({
  type: "slide",
  perPage: isMobile.value ? 1.5 : 3,
  arrows: false,
  pagination: false,
  gap: isMobile.value ? "0.1rem" : "0.2rem",
  drag: true,
  snap: true,
  rewind: false,
  speed: isMobile.value ? 300 : 400,
  dragMinThreshold: 10,
  flickMaxPages: 1,
  wheelMinThreshold: 50,
  padding: { left: 0, right: 0 },
  focus: 0,
  trimSpace: true,
  updateOnMove: true,
  breakpoints: {
    640: {
      perPage: 1.5,
      gap: "1rem",
      padding: { left: 0, right: 0 },
      focus: 0,
      drag: true,
      snap: true,
      speed: 300,
    },
    960: {
      perPage: 2,
    },
    1200: {
      perPage: 4,
    },
  },
}));

const formatName = (name) => name.toLowerCase().replace(/\s+/g, "");

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

function checkMobile() {
  isMobile.value = window.innerWidth <= 640;
  nextTick(() => {
    splideRef.value?.splide?.refresh();
  });
}

const handleMoved = () => {
  if (isMobile.value) {
    nextTick(() => {
      splideRef.value?.splide?.refresh();
    });
  }
};

function formatSGD(amount) {
  return `S$ ${Number(amount).toFixed(2)}`;
}

function formatIDR(symbol, amount) {
  return `${symbol} ${Number(amount * 10000).toLocaleString("id-ID", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

const getYouTubeEmbedUrl = (videoLink) => {
  if (!videoLink) return null;

  const match = videoLink.match(
    /(?:shorts\/|video\/|watch\?v=|embed\/|youtu\.be\/)([^#\&\?]+)/,
  );
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
};

onMounted(() => {
  checkMobile();
  window.addEventListener("resize", checkMobile);
  nextTick(() => {
    const splide = splideRef.value?.splide;
    if (splide) {
      splide.on("moved mounted", handleSlideMove);
      splide.on("moved", handleMoved);
      handleSlideMove();
    }
  });
});

onUnmounted(() => {
  window.removeEventListener("resize", checkMobile); // Clean up the event listener
});
</script>

<template>
  <div
    :id="`${formatName(props.title)}`"
    class="nursing-section mt-md-n8 mt-sm-2"
  >
    <div class="d-flex justify-space-between align-center mb-4">
      <div class="d-block d-md-flex align-center">
        <span class="ml-4 mr-8 ml-md-2 text-h5 font-weight-black">{{
          props.title
        }}</span>
        <v-select
          style="min-width: 200px"
          class="text-grey-darken-1"
          variant="outlined"
          v-model="selected"
          :items="[{ building_type: 'Show All', bt_id: 0 }, ...props.buildings]"
          item-value="bt_id"
          item-title="building_type"
          placeholder="Apartment Type"
        >
        </v-select>
      </div>
      <v-btn
        class="text-capitalize font-weight-bold"
        variant="text"
        height="40"
      >
        <span style="color: #00a4e4">View all</span>
      </v-btn>
    </div>

    <div class="position-relative">
      <v-btn
        v-if="!isMobile && !isBeginning"
        icon
        class="custom-arrow prev-arrow"
        @click="goPrev"
      >
        <span class="arrow-icon">←</span>
      </v-btn>

      <Splide ref="splideRef" :options="splideOptions">
        <SplideSlide v-for="menu in rents" :key="menu.rent_id">
          <!-- :key="menu?.product_id" -->
          <v-card class="card-wrapper" height="480" elevation="3">
            <!-- <router-link
              class="text-decoration-none"
              :to="`/rent/${menu.product_id}`"
            > -->
            <div v-if="menu?.video && getYouTubeEmbedUrl(menu.video)">
              <iframe
                width="100%"
                height="260"
                :src="getYouTubeEmbedUrl(menu.video)"
                frameborder="0"
                allowfullscreen
              ></iframe>
            </div>

            <v-img
              v-else
              :src="fileURL + menu?.image"
              height="260"
              class="position-relative"
              cover
            ></v-img>
            <div
              class="position-absolute bg-transparent top-0 right-0 bg-white mt-6 mr-12 cursor-pointer"
            >
              <v-icon class="text-white">mdi-heart-outline</v-icon>
            </div>
            <div
              v-if="menu?.featured == 'Y'"
              class="position-absolute left-0 bg-white mb-4 ml-4"
              style="bottom: 220px"
            >
              <span
                class="text-red-darken-1 text-caption font-weight-black pl-2 pr-8"
                >{{ menu?.type }} in Batam</span
              >
            </div>
            <!-- </router-link> -->
            <div
              class="card-title d-flex flex-column justify-space-between"
              style="height: 200px"
            >
              <p class="font-weight-black text-body-2">
                {{ menu?.rent_name }}
              </p>
              <p class="font-weight-bold text-grey-darken-1 text-caption mt-1">
                <!-- <span>{{ menu?.rent_parent_name }}</span> | -->
                <span>{{ menu?.bedQty }} Beds</span> |
                <span>{{ menu?.bathQty }} Bathrooms</span>
              </p>
              <!-- <p class="font-weight-bold text-blue-darken-4 text-caption mt-1">
                <span>{{ menu?.address }}</span>
              </p> -->
              <p class="text-subtitle-2 mt-1">
                <span class="text-red-darken-1 font-weight-black">{{
                  formatSGD(menu?.price)
                }}</span>
                <span class="text-grey-darken-1"> per day</span>
                <!-- (<span>{{
                  formatIDR(menu?.currency_symbol, menu?.price)
                }}</span
                >) -->
              </p>
              <v-btn
                elevation="0"
                style="
                  border-radius: 0;
                  height: 35px;
                  font-size: 14px;
                  background: #e41d5b !important;
                  color: white !important;
                  width: 150px;
                "
                class="font-weight-bold px-8"
              >
                View Details
              </v-btn>
            </div>
          </v-card>
        </SplideSlide>
      </Splide>

      <v-btn
        v-if="!isMobile && !isEnd"
        icon
        class="custom-arrow next-arrow"
        @click="goNext"
      >
        <span class="arrow-icon">→</span>
      </v-btn>
    </div>
  </div>
</template>

<style scoped>
.nursing-section {
  padding: 2rem 0;
}

.card-wrapper {
  margin: 0.5rem;
  overflow: hidden;
  background: white;
  transition: transform 0.2s ease;
}

.card-wrapper:hover {
  transform: translateY(-4px);
}

.card-title {
  padding: 1rem;
  font-weight: 500;
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

.splide-container {
  touch-action: pan-y pinch-zoom;
  -webkit-tap-highlight-color: transparent;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  transform: translateZ(0);
  will-change: transform;
}

@media (max-width: 640px) {
  .custom-arrow {
    display: none !important;
  }

  .splide-container {
    overflow: visible;
    cursor: grab;
    margin: 0;
    padding: 0;
  }

  .splide-container:active {
    cursor: grabbing;
  }

  .splide__track {
    overflow: visible;
    -webkit-mask-image: -webkit-radial-gradient(
      white,
      black
    ); /* Helps with flickering */
  }

  .splide__list {
    transform-style: preserve-3d;
    backface-visibility: hidden;
  }

  .card-wrapper {
    margin: 0.25rem;
    /* width: calc(66.666% - 0.5rem); */
  }

  .v-img {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    transform: translateZ(0);
    will-change: transform;
  }
}

.arrow-hidden {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
