<template>
  <v-row justify="center">
    <v-col cols="12" md="10">
      <v-card elevation="20" rounded="lg" class="">
        <v-row>
          <v-col cols="12" sm="6" class="pa-8 d-flex flex-column ga-4">
            <div class="text-h5 font-weight-medium text-red-darken-4">
              Interested in Renting your home?
            </div>
            <p>
              Buy or sell your home with our agents. House prices, inspections,
              negotiations and other services are included in the house price.
            </p>
            <v-btn
              color="#36AA71"
              rounded
              elevation="0"
              class="px-5 text-body-1 font-weight-bold"
              style="width: max-content"
              @click="handleContactUs"
              >CONTACT US</v-btn
            >
          </v-col>
          <v-col cols="12" sm="6">
            <v-img
              src="https://demo29.houzez.co/wp-content/uploads/2023/01/studio-0001-1024x683.jpg"
            ></v-img>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { computed } from "vue";

const footerData = computed(() => {
  return JSON.parse(localStorage.getItem("footerData"));
});

const handleContactUs = () => {
  window.location.href = `https://api.whatsapp.com/send?phone=${footerData.value?.whats_app}&text=I am a Property Owner and interested to list on 4walls`;
};
</script>

<style scoped></style>
