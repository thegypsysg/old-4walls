<template>
  <v-container :class="{ 'px-0': mallDetail == true }">
    <div
      v-if="mallDetail == true"
      class="d-flex justify-space-between promotion-container"
    >
      <h1>Promotions by Discount</h1>
      <router-link to="/category" class="text-decoration-none">
        <h1 class="view-all">View all</h1>
      </router-link>
    </div>
    <v-sheet class="mx-auto discount-sheet" elevation="0">
      <v-slide-group>
        <template #prev="{ on, attrs }">
          <v-btn
            v-if="activeIndexDiscount > 1"
            color="white"
            rounded
            icon
            v-bind="attrs"
            @click="previousSlideDiscount"
            v-on="on"
          >
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
        </template>
        <template #next="{ on, attrs }">
          <v-btn
            v-if="activeIndexDiscount + 1 <= promoOne / 5"
            color="white"
            rounded
            icon
            v-bind="attrs"
            @click="nextSlideDiscount"
            v-on="on"
          >
            <v-icon>mdi-arrow-right</v-icon>
          </v-btn>
        </template>
        <v-slide-group-item v-for="card in promoOne.slice(0, 6)" :key="card.id">
          <v-lazy :options="{ threshold: 0.5 }" min-height="100">
            <div>
              <v-card
                class="my-4 pa-4 mx-2"
                elevation="1"
                variant="outlined"
                :to="`/${card.path}`"
                @click="goToDetail(card)"
              >
                <div class="d-flex fill-height align-center justify-start">
                  <div style="border-radius: 50%; width: 40px; height: 40px">
                    <v-img
                      style="border-radius: 50%; width: 100%; height: 100%"
                      :src="card.img"
                      height="40"
                    >
                      <template #placeholder>
                        <div class="skeleton skeleton-discount ml-2" />
                      </template>
                    </v-img>
                  </div>
                  <p style="font-size: 12px" class="ml-1 font-weight-bold">
                    {{ card.title }}
                  </p>
                </div>
              </v-card>
              <div
                class="text-center"
                style="font-weight: 600; font-size: 12px"
              >
                {{ card.quantity }} Promotions
              </div>
            </div>
          </v-lazy>
        </v-slide-group-item>
        <v-slide-group-item v-slot="{ toggle }">
          <v-lazy :options="{ threshold: 0.5 }" min-height="50">
            <v-card
              class="my-4 pa-2 mx-2 d-flex align-center justify-center"
              elevation="1"
              variant="outlined"
              to="/discount-types"
              @click="toggle"
            >
              <div
                class="text-left mr-1"
                style="font-weight: 600; font-size: 10px"
              >
                <p>View all Discount Types</p>
              </div>
              <v-btn
                size="35"
                color="#0197d5"
                rounded
                icon
                v-bind="attrs"
                to="/discount-types"
                v-on="on"
              >
                <v-icon color="white"> mdi-arrow-right </v-icon>
              </v-btn>
            </v-card>
          </v-lazy>
        </v-slide-group-item>
      </v-slide-group>
    </v-sheet>
  </v-container>
  <div class="promotion-container">
    <v-container :class="{ 'px-0': mallDetail == true }">
      <div class="d-flex justify-space-between mt-n10">
        <h1>Promotions by Category</h1>
        <router-link to="/category" class="text-decoration-none">
          <h1 class="view-all">View all</h1>
        </router-link>
      </div>
      <v-sheet class="mx-auto mt-n3" elevation="0">
        <v-slide-group v-model="model2" class="pa-4">
          <template #prev="{ on, attrs }">
            <v-btn
              v-if="activeIndexCategory > 1"
              color="white"
              rounded
              icon
              v-bind="attrs"
              v-on="on"
              @click="previousSlideCategory"
            >
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </template>
          <template #next="{ on, attrs }">
            <v-btn
              v-if="activeIndexCategory + 1 <= promoTwo / 5"
              color="white"
              rounded
              icon
              v-bind="attrs"
              v-on="on"
              @click="nextSlideCategory"
            >
              <v-icon>mdi-arrow-right</v-icon>
            </v-btn>
          </template>
          <v-slide-group-item
            v-for="card in promoTwo.slice(0, 6)"
            :key="card.id"
            class="mx-4"
          >
            <v-lazy :options="{ threshold: 0.5 }" min-height="100">
              <v-card
                :to="`/${card.path}`"
                class="my-4 text-center mx-2"
                height="160"
                width="120"
                elevation="1"
                style="border-radius: 12px"
                @click="goToDetail(card)"
              >
                <v-card-title
                  style="
                    font-size: 12px;
                    line-height: 16.36px;
                    white-space: normal;
                    height: 50px;
                  "
                >
                  <div>
                    {{ card.title }}
                  </div>
                </v-card-title>
                <v-card-text class="w-100 d-flex justify-center align-center">
                  <div
                    class="mx-auto"
                    style="border-radius: 50%; width: 60px; height: 60px"
                  >
                    <v-img
                      style="
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                        object-fit: cover;
                      "
                      cover
                      :src="card.img"
                      height="60"
                    >
                      <template #placeholder>
                        <div class="skeleton skeleton-category ml-2" />
                      </template>
                    </v-img>
                  </div>
                </v-card-text>
                <v-card-actions
                  style="font-weight: 600; font-size: 12px"
                  class="d-flex justify-center pb-6"
                >
                  {{ card.quantity }} Promos
                </v-card-actions>
              </v-card>
            </v-lazy>
          </v-slide-group-item>
          <v-slide-group-item v-slot="{ toggle }">
            <v-lazy :options="{ threshold: 0.5 }" min-height="100">
              <v-card
                v-if="promoTwo?.length > 0"
                class="my-4 text-center mx-2 d-flex flex-column align-center justify-center px-auto pa-10"
                height="160"
                width="120"
                elevation="1"
                to="/category"
                style="border-radius: 12px; gap: 20px"
                @click="toggle"
              >
                <div
                  class="text-left"
                  style="font-weight: 600; font-size: 12px"
                >
                  <p>View All Category</p>
                </div>
                <v-btn
                  size="40"
                  color="#0197d5"
                  rounded
                  icon
                  v-bind="attrs"
                  to="/category"
                  v-on="on"
                >
                  <v-icon color="white"> mdi-arrow-right </v-icon>
                </v-btn>
              </v-card>
            </v-lazy>
          </v-slide-group-item>
        </v-slide-group>
      </v-sheet>
    </v-container>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Promotions",
  props: ["mallDetail", "promoOne", "promoTwo"],
  data: () => ({
    model: null,
    model2: null,
    activeIndexDiscount: 1,
    activeIndexCategory: 1,
    totalData: 10,
  }),
  methods: {
    goToDetail(data) {
      localStorage.setItem("promoDetailData", JSON.stringify(data));
      this.$router.push(`/promo-detail/${data.id}`);
    },
    previousSlideDiscount() {
      this.activeIndexDiscount--;
    },
    nextSlideDiscount() {
      this.activeIndexDiscount++;
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

<style>
.skeleton {
  height: 100%;
  border-radius: 100%;
  background: linear-gradient(-90deg, #f2f2f2 0%, #e1e1e1 50%, #f2f2f2 100%);
  background-size: 400% 400%;
  animation: skeleton 1.6s ease infinite;
}

.skeleton-discount {
  width: 35px;
}
.skeleton-category {
  width: 60px;
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
