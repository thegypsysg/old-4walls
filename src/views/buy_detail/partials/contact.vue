<template>
  <v-container class="pa-9 bg-white">
    <div>Contact Information</div>

    <hr class="my-6" />

    <div class="d-flex ga-2 align-center">
      <v-avatar color="grey" size="150" style="border-radius: 5px">
        <v-img :src="$fileURL + agent_main_image" cover></v-img>
      </v-avatar>
      <div>
        <div class="text-h6 font-weight-normal">
          <v-icon icon="mdi-account-outline" size="20"></v-icon>
          {{ agent_name }}
        </div>
        <div class="d-flex ga-3 mt-2">
          <div class="font-weight-light text-body-2">
            <v-icon icon="mdi-gmail" size="18"></v-icon> {{ email }}
          </div>
          <div class="font-weight-light text-body-2">
            <v-icon icon="mdi-cellphone-basic" size="18"></v-icon> {{ mobile }}
          </div>
          <div class="font-weight-light text-body-2">
            <v-icon icon="mdi-whatsapp" size="18"></v-icon> {{ whats_app }}
          </div>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script setup>
const props = defineProps({
  agent_main_image: { type: String },
  agent_name: { type: String },
  email: { type: String },
  mobile: { type: String },
  whats_app: { type: String },
});
</script>
