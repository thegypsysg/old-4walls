<template>
  <v-container class="pa-9 bg-white">
    <div>Video</div>

    <hr class="my-6" />

    <v-responsive aspect-ratio="1.7">
      <iframe
        width="100%"
        height="100%"
        :src="video_link"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
    </v-responsive>
  </v-container>
</template>

<script setup>
const props = defineProps({
  video_link: { type: String },
});
</script>
