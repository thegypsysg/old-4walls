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
const isBestViewed = ref(false);
const selected = ref(null);

const filteredRents = computed(() => {
  const mapRents = (item) => {
    const rateItems = item.property_rates.map((range, index) => ({
      ...range,
      selected: ref(index === 0), // Set selected true hanya untuk item pertama
    }));

    return {
      ...item,
      selectedRateSG: computed(() => {
        const selectedRate = rateItems.find((rate) => rate.selected.value);
        return selectedRate?.rate_sg || null;
      }),
      selectedRateHome: computed(() => {
        const selectedRate = rateItems.find((rate) => rate.selected.value);
        return selectedRate?.rate_home || null;
      }),
      selectedDescription: computed(() => {
        const selectedRate = rateItems.find((rate) => rate.selected.value);
        return selectedRate?.rate_type?.description || null;
      }),
      selectedVideo: ref("youtube"),
      rateItems,
    };
  };

  let filtered = props.rents;

  if (selected.value && selected.value !== 0) {
    filtered = props.rents.filter((rent) => rent.bt_id === selected.value);
  }

  return filtered.map(mapRents);
});

// console.log(filteredRents.value);

const splideOptions = computed(() => ({
  type: "slide",
  perPage: isMobile.value ? 1 : 3.5,
  arrows: false,
  pagination: false,
  gap: isMobile.value ? "0.5rem" : "0.2rem",
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
      perPage: 1,
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
      perPage: 3.5,
    },
  },
}));

const formatName = (name) => name.toLowerCase().replace(/\s+/g, "");

function handleSelectRate(menu, selectedItem) {
  // const isAlreadySelected = selectedItem.selected.value;

  // Set semua rangeItems menjadi tidak terpilih
  menu.rateItems.forEach((item) => {
    item.selected.value = false;
  });

  // Undone the unselect quantity here
  selectedItem.selected.value = true;

  // Jika belum dipilih sebelumnya, jadikan selected
  /* if (!isAlreadySelected) {
    selectedItem.selected.value = true;
  }
  else {
    selectedItem.selected.value = true;
  } */
}

const setSelectedVideo = (menu, platform) => {
  menu.selectedVideo.value = platform;
};

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

const getTikTokEmbedUrl = (videoLink) => {
  if (!videoLink) return null;

  const match = videoLink.match(/tiktok\.com\/@[\w.]+\/video\/(\d+)/);
  return match ? `https://www.tiktok.com/embed/${match[1]}` : null;
};

const goWhatsapp = (data) => {
  const footerData = JSON.parse(localStorage.getItem("footerData"));

  const message = `
${data?.button_name}
—-------------------------------
Property ID : ${data?.property_id || ""}

Ref No        : ${data?.property_ref_no || ""}

${data?.tag_line || ""}
${data?.town_name || ""}, ${data?.city_name || ""}, ${data?.country_name || ""}
  `.trim();

  const encodedMessage = encodeURIComponent(message);
  const url = `https://api.whatsapp.com/send?phone=${footerData?.whats_app || ""}&text=${encodedMessage}`;
  window.open(url, "_blank");
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
      <div class="d-md-flex align-center justify-space-between w-100 w-md-50">
        <div
          class="d-flex ml-2 mr-0 mr-md-8 text-h6 text-md-h5 font-weight-black"
        >
          <span class="mr-2">{{ props.title }}</span>
          <p>
            (
            <span class="text-blue-darken-4">{{ filteredRents.length }}</span>
            Properties )
          </p>
        </div>
        <v-select
          style="min-width: 150px; max-width: 200px"
          variant="outlined"
          v-model="selected"
          :items="[{ building_type: 'Show All', bt_id: 0 }, ...props.buildings]"
          item-value="bt_id"
          item-title="building_type"
          placeholder="Apartment Type"
          clearable
        >
        </v-select>
      </div>
      <v-btn
        v-if="!isMobile"
        class="text-capitalize font-weight-bold"
        variant="text"
        height="40"
        @click="isBestViewed = true"
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

      <Splide v-if="!isMobile" ref="splideRef" :options="splideOptions">
        <SplideSlide v-for="menu in filteredRents" :key="menu.rent_id">
          <!-- :key="menu?.product_id" -->
          <div
            class="d-flex align-center justify-space-between px-4"
            :class="
              !menu?.video && !menu?.tik_tok_video_link ? 'py-4' : undefined
            "
          >
            <v-btn
              variant="text"
              class="bg-grey-darken-4"
              v-if="menu?.video"
              @click="setSelectedVideo(menu, 'youtube')"
            >
              Youtube
            </v-btn>
            <v-btn
              variant="text"
              class="bg-blue-darken-4"
              v-if="menu?.tik_tok_video_link"
              @click="setSelectedVideo(menu, 'tiktok')"
            >
              Tik Tok
            </v-btn>
          </div>
          <v-card
            class="card-wrapper"
            :height="menu?.selectedVideo.value == 'youtube' ? 600 : 900"
            elevation="3"
          >
            <!-- <router-link
              class="text-decoration-none"
              :to="`/rent/${menu.product_id}`"
            > -->
            <div
              v-if="
                menu?.selectedVideo.value == 'youtube' &&
                menu?.video &&
                getYouTubeEmbedUrl(menu.video)
              "
            >
              <iframe
                width="100%"
                height="260"
                :src="getYouTubeEmbedUrl(menu.video)"
                frameborder="0"
                allowfullscreen
              ></iframe>
            </div>

            <div
              v-else-if="
                menu?.selectedVideo.value == 'tiktok' &&
                menu?.tik_tok_video_link &&
                getTikTokEmbedUrl(menu.tik_tok_video_link)
              "
            >
              <iframe
                width="100%"
                height="560"
                :src="getTikTokEmbedUrl(menu.tik_tok_video_link)"
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
            <!-- <div
              class="position-absolute bg-transparent top-0 right-0 bg-white mt-6 mr-12 cursor-pointer"
            >
              <v-icon class="text-white">mdi-heart-outline</v-icon>
            </div> -->
            <div
              v-if="menu?.featured == 'Y'"
              class="position-absolute left-0 bg-white mb-4 ml-4"
              style="bottom: 340px"
            >
              <span
                class="text-red-darken-1 text-caption font-weight-black pl-2 pr-8"
                >{{ menu?.building_type }} {{ menu?.type }} in
                {{ menu?.city }}</span
              >
            </div>
            <!-- </router-link> -->
            <div
              class="card-title d-flex flex-column justify-space-between ga-3"
            >
              <p class="font-weight-black text-body-2 two-lines">
                {{ menu?.rent_name }}
              </p>
              <!-- <div class="d-flex align-center justify-space-between"> -->
              <p class="font-weight-black text-body-2">
                <span
                  v-if="
                    menu?.display_construction == 'Y' && menu?.construction_name
                  "
                  >(<span class="text-blue-darken-4">{{
                    menu?.construction_name
                  }}</span
                  >)</span
                >
              </p>
              <p class="font-weight-bold text-grey-darken-1 text-caption mt-1">
                <!-- <span>{{ menu?.rent_parent_name }}</span> | -->
                <span>{{ menu?.bedQty }} Beds</span> |
                <span>{{ menu?.bathQty }} Bathrooms</span>
              </p>

              <!-- </div> -->
              <!-- <p class="font-weight-bold text-blue-darken-4 text-caption mt-1">
                <span>{{ menu?.address }}</span>
              </p> -->
              <div class="d-flex align-center ga-1 my-2">
                <template v-for="item in menu?.rateItems" :key="item.pr_id">
                  <v-btn
                    size="xs"
                    color="black"
                    class="text-caption pa-1 rounded-lg"
                    @click="handleSelectRate(menu, item)"
                    :variant="item.selected.value ? 'flat' : 'outlined'"
                    >{{ item?.rate_type?.rate_name }}</v-btn
                  >
                  <!-- @click="item.selected.value = !item.selected.value" -->
                </template>
              </div>
              <p
                v-if="menu?.selectedDescription.value"
                class="text-caption font-weight-bold"
              >
                ({{ menu?.selectedDescription.value }})
              </p>
              <div class="d-flex align-center ga-10">
                <p class="text-subtitle-2 mt-1">
                  <span
                    v-if="menu?.selectedRateSG.value"
                    class="text-red-darken-1 font-weight-black"
                    >S$ {{ menu?.selectedRateSG.value }}</span
                  >
                  <span
                    v-else-if="
                      !menu?.selectedRateSG.value &&
                      menu?.selectedRateHome.value
                    "
                    class="text-red-darken-1 font-weight-black"
                    >{{ menu?.currency_symbol }}
                    {{ menu?.selectedRateHome.value }}</span
                  >

                  <!-- (<span>{{
                  formatIDR(menu?.currency_symbol, menu?.price)
                  }}</span
                  >) -->
                </p>
                <p
                  v-if="
                    menu?.selectedRateHome.value && menu?.selectedRateSG.value
                  "
                  class="text-caption font-weight-bold"
                >
                  ({{ menu?.currency_symbol }}
                  {{ menu?.selectedRateHome.value }})
                </p>
              </div>
              <div class="d-flex align-center justify-space-between my-2">
                <v-btn
                  elevation="0"
                  style="
                    border-radius: 0;
                    height: 35px;
                    font-size: 14px;
                    background: #e41d5b !important;
                    color: white !important;
                    width: 180px;
                  "
                  @click="goWhatsapp(menu)"
                  class="font-weight-bold px-8"
                >
                  Inquire Now
                </v-btn>
                <v-btn
                  elevation="2"
                  rounded
                  class="font-weight-bold px-8 rounded-full"
                >
                  <v-icon class="text-pink">mdi-heart-outline</v-icon>
                </v-btn>
              </div>
            </div>
          </v-card>
        </SplideSlide>
      </Splide>
      <template v-else>
        <div
          class="pb-8 pt-4"
          :class="{ 'border-b-md': index != filteredRents.length - 1 }"
          v-for="(menu, index) in filteredRents"
          :key="menu.rent_id"
        >
          <!-- :key="menu?.product_id" -->
          <div class="d-flex align-center justify-space-between px-4">
            <v-btn
              variant="text"
              class="bg-grey-darken-4"
              v-if="menu?.video"
              @click="setSelectedVideo(menu, 'youtube')"
            >
              Youtube
            </v-btn>
            <v-btn
              variant="text"
              class="bg-blue-darken-4"
              v-if="menu?.tik_tok_video_link"
              @click="setSelectedVideo(menu, 'tiktok')"
            >
              Tik Tok
            </v-btn>
          </div>
          <v-card
            class="card-wrapper"
            :height="menu?.selectedVideo.value == 'youtube' ? 600 : 900"
            elevation="3"
          >
            <!-- <router-link
              class="text-decoration-none"
              :to="`/rent/${menu.product_id}`"
            > -->
            <div
              v-if="
                menu?.selectedVideo.value == 'youtube' &&
                menu?.video &&
                getYouTubeEmbedUrl(menu.video)
              "
            >
              <iframe
                width="100%"
                height="260"
                :src="getYouTubeEmbedUrl(menu.video)"
                frameborder="0"
                allowfullscreen
              ></iframe>
            </div>

            <div
              v-else-if="
                menu?.selectedVideo.value == 'tiktok' &&
                menu?.tik_tok_video_link &&
                getTikTokEmbedUrl(menu.tik_tok_video_link)
              "
            >
              <iframe
                width="100%"
                height="560"
                :src="getTikTokEmbedUrl(menu.tik_tok_video_link)"
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
            <!-- <div
              class="position-absolute bg-transparent top-0 right-0 bg-white mt-6 mr-12 cursor-pointer"
            >
              <v-icon class="text-white">mdi-heart-outline</v-icon>
            </div> -->
            <div
              v-if="menu?.featured == 'Y'"
              class="position-absolute left-0 bg-white mb-4 ml-4"
              style="bottom: 340px"
            >
              <span
                class="text-red-darken-1 text-caption font-weight-black pl-2 pr-8"
                >{{ menu?.building_type }} {{ menu?.type }} in
                {{ menu?.city }}</span
              >
            </div>
            <!-- </router-link> -->
            <div
              class="card-title d-flex flex-column justify-space-between ga-3"
            >
              <p class="font-weight-black text-body-2 two-lines">
                {{ menu?.rent_name }}
              </p>
              <p class="font-weight-black text-body-2">
                <span
                  v-if="
                    menu?.display_construction == 'Y' && menu?.construction_name
                  "
                  >(<span class="text-blue-darken-4">{{
                    menu?.construction_name
                  }}</span
                  >)</span
                >
              </p>
              <p class="font-weight-bold text-grey-darken-1 text-caption mt-1">
                <!-- <span>{{ menu?.rent_parent_name }}</span> | -->
                <span>{{ menu?.bedQty }} Beds</span> |
                <span>{{ menu?.bathQty }} Bathrooms</span>
              </p>

              <!-- <p class="font-weight-bold text-blue-darken-4 text-caption mt-1">
                <span>{{ menu?.address }}</span>
              </p> -->
              <div class="d-flex align-center ga-1 my-2">
                <template v-for="item in menu?.rateItems" :key="item.pr_id">
                  <v-btn
                    size="xs"
                    color="black"
                    class="text-caption pa-1 rounded-lg"
                    @click="handleSelectRate(menu, item)"
                    :variant="item.selected.value ? 'flat' : 'outlined'"
                    >{{ item?.rate_type?.rate_name }}</v-btn
                  >
                  <!-- @click="item.selected.value = !item.selected.value" -->
                </template>
              </div>
              <p
                v-if="menu?.selectedDescription.value"
                class="text-caption font-weight-bold"
              >
                ({{ menu?.selectedDescription.value }})
              </p>
              <div class="d-flex align-center ga-10">
                <p class="text-subtitle-2 mt-1">
                  <span
                    v-if="menu?.selectedRateSG.value"
                    class="text-red-darken-1 font-weight-black"
                    >S$ {{ menu?.selectedRateSG.value }}</span
                  >
                  <span
                    v-else-if="
                      !menu?.selectedRateSG.value &&
                      menu?.selectedRateHome.value
                    "
                    class="text-red-darken-1 font-weight-black"
                    >{{ menu?.currency_symbol }}
                    {{ menu?.selectedRateHome.value }}</span
                  >

                  <!-- (<span>{{
                  formatIDR(menu?.currency_symbol, menu?.price)
                  }}</span
                  >) -->
                </p>
                <p
                  v-if="
                    menu?.selectedRateHome.value && menu?.selectedRateSG.value
                  "
                  class="text-caption font-weight-bold"
                >
                  ({{ menu?.currency_symbol }}
                  {{ menu?.selectedRateHome.value }})
                </p>
              </div>
              <div class="d-flex align-center justify-space-between my-2">
                <v-btn
                  elevation="0"
                  style="
                    border-radius: 0;
                    height: 35px;
                    font-size: 14px;
                    background: #e41d5b !important;
                    color: white !important;
                    width: 180px;
                  "
                  @click="goWhatsapp(menu)"
                  class="font-weight-bold px-8"
                >
                  Inquire Now
                </v-btn>
                <v-btn
                  elevation="2"
                  rounded
                  class="font-weight-bold px-8 rounded-full"
                >
                  <v-icon class="text-pink">mdi-heart-outline</v-icon>
                </v-btn>
              </div>
            </div>
          </v-card>
        </div>
      </template>

      <v-btn
        v-if="!isMobile && !isEnd"
        icon
        class="custom-arrow next-arrow"
        @click="goNext"
      >
        <span class="arrow-icon">→</span>
      </v-btn>
    </div>
    <v-dialog v-model="isBestViewed" persistent width="auto">
      <v-card width="350">
        <v-card-text class="">
          <h4 class="mt-4 mb-8 text-center">Best Viewed on Mobile</h4>
          <v-btn class="mb-4 w-100 bg-primary" @click="isBestViewed = false">
            OK
          </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
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
    width: 100%;
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

.two-lines {
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Maksimal 2 baris */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
