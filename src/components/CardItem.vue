<template>
  <v-container class="mt-md-4">
    <v-row>
      <v-col cols="12">
        <div>
          <p class="text-center" :class="isSmall ? 'text-caption' : undefined">
            <span class="mdi mdi-office-building-outline"></span> EXCLUSIVE
            LOCATIONS
          </p>
          <p
            align="center"
            class="header-title mt-4"
            :class="isSmall ? 'cust-title-2' : 'cust-title-1'"
          >
            Discover the Best Locations in the UAE
          </p>
          <p
            class="text-center text-grey-darken-1 mx-16 mt-n4"
            :class="isSmall ? 'text-caption' : undefined"
            :style="{
              letterSpacing: isSmall ? '2px' : '4px',
              lineHeight: isSmall ? '20px' : '30px',
            }"
          >
            EXPLORE DIVERSE NEIGHBORHOODS, EACH OFFERING UNIQUE AMENITIES AND
            LIFESTYLE OPPORTUNITIES.
          </p>
        </div>
      </v-col>
    </v-row>
    <v-row class="mb-md-8 d-flex">
      <v-col cols="12">
        <div
          class="d-flex justify-center"
          :class="isSmall ? 'flex-column' : ''"
          style="gap: 30px"
        >
          <div v-for="(card, i) in card1" :key="i">
            <v-lazy :options="{ threshold: 0.5 }" min-height="200">
              <v-card
                class="mx-auto card-item"
                :min-width="isSmall ? 200 : 300"
                height="400"
                elevation="0"
              >
                <div class="overlay"></div>
                <!-- :src="`@/assets/images/banner/4walls-${card.img}.jpg`" -->
                <v-img
                  :src="card.img"
                  height="100%"
                  width="100%"
                  class="card-image"
                  cover
                >
                  <template #placeholder> <div class="skeleton" /> </template
                ></v-img>

                <v-card-title class="card-title d-flex flex-column">
                  <span class="text-caption font-weight-thin"
                    >{{ card.jobs }} Properties</span
                  >
                  <span>{{ card.title }}</span>
                </v-card-title>
              </v-card>
            </v-lazy>
          </div>
        </div>
      </v-col>
      <v-col cols="12" class="d-flex justify-center mt-6">
        <v-btn class="bg-black text-white pl-12 pr-8" height="40" variant="text"
          >Explore all Cities
          <v-icon icon="mdi-arrow-right" class="ml-8"></v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import img1 from "@/assets/images/banner/4walls-GOA.jpg";
import img2 from "@/assets/images/banner/4walls-BATAM.jpg";
import img3 from "@/assets/images/banner/4walls-MUMBAI.jpg";
</script>
<script>
export default {
  name: "CardItem",
  data() {
    return {
      screenWidth: window.innerWidth,
      card1: [
        {
          img: img1,
          jobs: 2,
          title: "Goa",
        },
        {
          img: img2,
          jobs: 4,
          title: "Batam",
        },
        {
          img: img3,
          jobs: 5,
          title: "Mumbai",
        },
      ],
    };
  },
  computed: {
    isSmall() {
      return this.screenWidth < 640;
    },
  },
  created() {
    window.addEventListener("resize", this.handleResize);
  },
  unmounted() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleResize() {
      this.screenWidth = window.innerWidth;
    },
    previousSlideCategory() {
      this.activeIndexCategory--;
    },
    nextSlideCategory() {
      this.activeIndexCategory++;
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap");

.cust-title-2 {
  font-family: "DM Serif Display", system-ui;
  font-weight: 400;
  font-size: 33px;
  line-height: 35px;
}
.cust-title-1 {
  font-family: "DM Serif Display", system-ui;
  font-weight: 400;
}
.card-container {
  display: flex;
  gap: 20px;
  width: 100%;
}
.card-container-2 {
  gap: 5px;
}

.card-item {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  flex-grow: 1;
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

.card-image {
  position: absolute;
  transition: all 0.3s;
  top: 0;
  left: 0;
  object-fit: cover;
  object-position: center;
  width: 100%;
  height: 100%;
  transform: scale(1);
}

.card-item:hover .card-image {
  transform: scale(1.2);
}

.card-title {
  position: absolute;
  bottom: 5%;
  left: 5px;
  color: white;
  padding: 10px;
  z-index: 2;
}

.card-title-2 {
  font-size: 16px;
}
.card-title-3 {
  font-size: 14px;
}

.card-tag {
  background: #fa2964;
  color: #ffffff;
  position: absolute;
  top: 10px;
  left: 0;
  padding: 5px 15px;
  font-size: 11px;
}

.skeleton {
  width: 100%;
  height: 100%;
  border-radius: 0;

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

@media (max-width: 1279px) {
  .card-container {
    flex-wrap: wrap;
  }
}
</style>
