<template>
  <v-hover v-slot:default="{ isHovering, props }">
    <v-responsive v-if="isSquare" aspect-ratio="1"
      :style="`height: 100%; width: 100%; background-image:url('${image}'); background-size: cover;`"
      class="trending rounded">
      <div v-bind="props"
        :style="[isHovering ? 'background-color: rgba(0, 0, 0, 0.0)' : 'background-color: rgba(0, 0, 0, 0.3)', 'transition: background-color 0.3s ease']"
        class="fill-height d-flex flex-column align-center justify-between pa-2 pa-md-8 text-white font-weight-light">
        <div class="text-center font-weight-bold">
          <div class="text-h6 text-md-h4 font-weight-bold text-white">{{ title }}</div>
          <div class="text-body-2 font-weight-bold">24 Properties</div>
        </div>
        <div class="text-center mt-auto mb-auto">
          <v-btn :to="`/${title.replaceAll(' ', '-').toLocaleLowerCase()}`" class="ma-2 text-caption"
            :size="$vuetify.display.mdAndUp ? 'large' : 'x-small'" color="pink darken-1" rounded>
            View Options
          </v-btn>
        </div>
      </div>
    </v-responsive>
    <v-responsive v-else :style="`height: 100%; width: 100%; background-image:url('${image}'); background-size: cover;`"
      class="trending rounded">
      <div v-bind="props"
        :style="[isHovering ? 'background-color: rgba(0, 0, 0, 0.0)' : 'background-color: rgba(0, 0, 0, 0.3)', 'transition: background-color 0.3s ease']"
        class="fill-height d-flex flex-column align-center justify-between pa-2 pa-md-8 text-white font-weight-light">
        <div class="text-center font-weight-bold">
          <div class="text-h6 text-md-h4 font-weight-bold text-white">{{ title }}</div>
          <div class="text-body-2 font-weight-bold">24 Properties</div>
        </div>
        <div class="text-center mt-auto mb-auto">
          <v-btn :to="`/${title.replaceAll(' ', '-').toLocaleLowerCase()}`" class="ma-2 text-caption"
            :size="$vuetify.display.mdAndUp ? 'large' : 'x-small'" color="pink darken-1" rounded>
            View Options
          </v-btn>
        </div>
      </div>
    </v-responsive>
  </v-hover>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  image: string
  isSquare: boolean
}>()

</script>
