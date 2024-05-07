<template>
  <v-container class="mt-md-4">
    <v-row>
      <v-col cols="12">
        <p align="center" class="header-title">Looking for a Break. ?</p>
      </v-col>
    </v-row>
    <v-row class="mb-md-8 d-flex">
      <v-col cols="12">
        <div class="d-flex justify-center" :class="isSmall ? 'flex-column' : ''" style="gap: 30px">
          <div v-for="(card, i) in card1" :key="i">
            <v-lazy :options="{ threshold: 0.5 }" min-height="200">
              <v-card
                class="mx-auto card-item"
                :min-width="isSmall? 200: 300"
                height="300"
                elevation="0"
              >
                <v-img
                src="@/assets/partner-1.png"
                  height="100%"
                  width="100%"
                  class="card-image"
                  cover
                >
                  <template #placeholder> <div class="skeleton" /> </template
                ></v-img>
                <div class="card-tag">{{ card.jobs }} Jobs</div>

                <v-card-title class="card-title"
                  >{{ card.title }}</v-card-title
                >
              </v-card>
            </v-lazy>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "CardItem",
  data() {
    return {
      screenWidth: window.innerWidth,
      card1: [
        {
          img: 'partner-1',
          jobs: 12,
          title: "Staycation"
        },
        {
          img: 'partner-2',
          jobs: 14,
          title: "Vacation"
        },
      ]
    };
  },
  computed: {
    isSmall() {
      return this.screenWidth < 640;
    },
  },
  created() {
    window.addEventListener('resize', this.handleResize);
  },
  unmounted() {
    window.removeEventListener('resize', this.handleResize);
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
  border-radius: 10px;
  cursor: pointer;
  flex-grow: 1;
  width: 100%;
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
  left: 50%;
  transform: translateX(-50%);
  color: white;
  font-size: 30px;
  font-weight: bold;
  padding: 10px;
  text-align: center;
  width: 100%;
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
