<template>
  <v-container class="mb-14 mt-md-10 mt-sm-2 wrapper-box">
    <v-row>
      <v-col cols="12">
        <p align="center" class="header-title">Become Our Partner</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col sm="12" md="4" cols="12">
        <v-lazy :options="{ threshold: 0.5 }" min-height="200">
          <v-card class="partners_box">
            <div class="img-cont">
              <v-img
                src="@/assets/partner-1.png"
                class="align-end img-item"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
                cover
              >
                <template #placeholder>
                  <div class="skeleton" />
                </template>
              </v-img>
            </div>
            <v-card-title class="text-black text-center">
              As an Owner
            </v-card-title>
            <v-card-text class="text-center">
              Do your have a property to buy or sell . We will help you find a reliable Tenant / Buyer.
            </v-card-text>
            <v-card-actions align="center">
              <v-btn
                elevation="0"
                class="mx-auto bg-info"
                style="background: #37b909 !important"
              >
                Ride with us
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-lazy>
      </v-col>
      <v-col sm="12" md="4" cols="12">
        <v-lazy :options="{ threshold: 0.5 }" min-height="200">
          <v-card class="partners_box">
            <div class="img-cont">
              <v-img
                src="@/assets/partner-2.png"
                class="align-end img-item"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
                cover
              >
                <template #placeholder>
                  <div class="skeleton" />
                </template>
              </v-img>
            </div>
            <v-card-title class="text-black text-center">
              As a Real Estate Agent
            </v-card-title>
            <v-card-text class="text-center">
              Are you a Real Estate Agent. Do you want to Sell or Rent your clients property through us .
            </v-card-text>
            <v-card-actions align="center">
              <v-btn
                elevation="0"
                class="mx-auto bg-info"
                style="background: #00cdcd !important"
              >
                Partner with us
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-lazy>
      </v-col>
      <v-col sm="12" md="4" cols="12">
        <v-lazy :options="{ threshold: 0.5 }" min-height="200">
          <v-card class="partners_box">
            <div class="img-cont">
              <v-img
                src="@/assets/partner-3.png"
                class="align-end img-item"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
                cover
              >
                <template #placeholder>
                  <div class="skeleton" />
                </template>
              </v-img>
            </div>
            <v-card-title class="text-black text-center">
              As a Property Developer
            </v-card-title>
            <v-card-text class="text-center">
              Do you have any new projects on the way or already ready to sell in the market
            </v-card-text>
            <v-card-actions align="center">
              <v-btn
                elevation="0"
                class="mx-auto bg-info"
                style="background: #808080 !important"
              >
                Inquire now
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-lazy>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "Partners",
};
</script>
<style>
.img-cont {
  position: relative;
  overflow: hidden;
}

.img-item {
  transition: all 0.3s;
  width: 100%;
  height: auto;
  transform: scale(1);
}

.partners_box:hover .img-item {
  transform: scale(1.2);
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
</style>
