<template>
  <v-container id="happeningTarget">
    <div>
      <p class="text-center">
        <span class="mdi mdi-domain"></span> FEATURED HOMES
      </p>
      <p align="center" class="header-title cust-title mt-4">
        Our New Homes For Sale and Rent
      </p>
      <p
        class="text-center text-grey-darken-1 mx-16 mt-n4"
        style="letter-spacing: 4px; line-height: 30px"
      >
        OUR PORTFOLIO INCLUDES HIGH-QUALITY VILLAS, SPACIOUS APARTMENTS, AND
        THOUGHTFULLY DESIGNED TOWNHOUSES.
      </p>
    </div>
    <div class="happening d-flex justify-center align-center mb-8 mt-16">
      <v-lazy :options="{ threshold: 0.5 }" min-height="270">
        <v-card class="happening-item" elevation="0">
          <div class="happening-info text-white">
            <h1 class="font-weight-black">BUY</h1>
            <p class="font-weight-bold">24 Properties</p>
          </div>

          <div class="overlay"></div>
          <v-img
            min-width="270"
            min-height="370"
            class="happening-item-img"
            src="@/assets/images/banner/4walls-BUY.jpg"
            transition="fade-transition"
          >
            <template #placeholder>
              <div class="skeleton" />
            </template>
          </v-img>
        </v-card>
      </v-lazy>
      <v-lazy :options="{ threshold: 0.5 }" min-height="270">
        <v-card class="happening-item" elevation="0">
          <div class="happening-info">
            <h1 class="font-weight-black text-red-darken-2">RENT</h1>
            <p class="font-weight-bold text-white">24 Properties</p>
          </div>

          <div class="overlay"></div>
          <v-img
            min-width="270"
            min-height="370"
            class="happening-item-img"
            src="@/assets/images/banner/4walls-RENT.jpg"
            transition="fade-transition"
          >
            <template #placeholder>
              <div class="skeleton" />
            </template>
          </v-img>
        </v-card>
      </v-lazy>
    </div>
  </v-container>
</template>

<script>
import { eventBus } from "@/util/bus";
import { onMounted, watch, nextTick } from "vue";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Happening",
  setup() {
    onMounted(() => {
      watch(
        () => eventBus.scrollToSection,
        async (newValue) => {
          if (newValue) {
            await nextTick();
            const element = document.getElementById(newValue);
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
              eventBus.scrollToSection = null;
            }
          }
        },
      );
    });
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap");

.cust-title {
  font-family: "DM Serif Display", system-ui;
  font-weight: 400;
}

.happening {
  gap: 20px;
}
.happening-title {
  max-width: 300px;
}

@media screen and (max-width: 1170px) {
  .happening-title {
    max-width: 200px;
  }
}

.happening-title h1 {
  font-weight: 500;
}
.happening-title p {
  color: #5f5f5f;
}

.line-divider {
  height: 6px;
  width: 240px;
  background: #f9bc06;
  border-radius: 100%;
}

.happening-item {
  position: relative;
  overflow: hidden;
}
.happening-item-img {
  max-width: 100%;
  transition: all 0.3s;
  display: block;
  width: 100%;
  height: auto;
  transform: scale(1);
}

.happening-item:hover .happening-item-img {
  transform: scale(1.1);
}

.happening-info {
  position: absolute;
  top: 20px;
  z-index: 100;
  text-align: center;
  width: 100%;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4); /* Warna overlay dan transparansi */
  z-index: 1;
}

.skeleton {
  width: 100%;
  height: 100%;
  border-radius: 20px;
  background: linear-gradient(-90deg, #f2f2f2 0%, #e1e1e1 50%, #f2f2f2 100%);
  background-size: 400% 400%;
  animation: skeleton 1.6s ease infinite;
}

@keyframes skeleton {
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: -100% 0;
  }
}
</style>
