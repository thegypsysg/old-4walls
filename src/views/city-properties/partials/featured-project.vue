<template>
  <div>
    <div class="d-flex gap-2 justify-center ga-3 mt-12">
      <span class="mdi mdi-office-building-outline"></span>
      <span>FEATURED PROJECT</span>
    </div>
    <div class="featured-title text-h4 text-md-h3 text-center mt-6">
      EXPLORE NEW & UPCOMING PROJECTS IN BATAM
    </div>

    <div class="featured-sub-title text-center text-grey-darken-1 mt-6">
      READY TO INVEST IN OUR PORTFOLIO OF NEW PROJECTS FOR INVESTMENT OR RESIDENTIAL
    </div>

    <v-row justify="center" class="my-6">
      <transition-group name="card-transition" mode="out-in">
        <template v-for="(data, i) in listData" :key="i">
          <v-col cols="12" md="4">
            <v-hover v-slot:default="{ isHovering, props }">
              <v-container class="rounded">
                <v-img :src="data.img" cover style="height: 100%" aspect-ratio="1">
                  <div v-bind="props" :style="[
                    isHovering
                      ? 'background-color: rgba(0, 0, 0, 0.0)'
                      : 'background-color: rgba(0, 0, 0, 0.3)',
                    'transition: background-color 0.3s ease',
                  ]" class="fill-height pa-6 text-white font-weight-light">
                    <div class="d-flex flex-column justify-space-between fill-height">
                      <v-badge content="UNDER CONSTRUCTION" inline color="primary" rounded="0"></v-badge>
                      <div class="d-flex flex-column flex-md-row justify-space-between align-center ga-3">

                        <div class="text-center text-md-left">
                          <div class="text-h5 font-weight-bold text-white">
                            {{ data.name }}
                          </div>
                          <div class="font-weight-bold">{{ data.company.town }}</div>
                          <div class="text-caption">Completion <span class="font-weight-bold">{{ data.company.completion
                              }}</span></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </v-img>
                <div class="d-flex flex-column ga-2 mt-2">
                  <div class="d-flex ga-2 align-center justify-start">
                    <img :src="data.company.icon" style="height:30px" />
                    <div class="font-weight-bold text-body-2">{{ data.company.name }}</div>
                  </div>
                  <div class="font-weight-bold text-body-2">{{ data.company.caption }}</div>
                  <div class="text-caption font-weight-light">{{ data.description }}</div>
                </div>
              </v-container>
            </v-hover>
          </v-col>
        </template>
      </transition-group>
    </v-row>
  </div>
</template>

<script setup lang="ts">

const listData = [
  {
    under_construction: true,
    img: 'https://opus-bay.com/wp-content/uploads/2023/02/State-Of-The-Art-Paradise-Image-Mob.png',
    name: 'Opus Bay',
    description: 'Our condos offer the perfect blend of luxury and practially. Located in some of the most sought-after locations in Batam, our condos offer easy access to all the amenities you need for a comfortable and convenient lifestyle.',
    company: {
      name: 'TUAN SING HOLDINGS UNITED',
      caption: 'The Perfect Place to Live Your Dreams',
      icon: 'https://media.licdn.com/dms/image/C5103AQEgthUJyEnmyw/profile-displayphoto-shrink_200_200/0/1521704086565?e=2147483647&v=beta&t=p0SmV73TJdS8w9RSTEAOdef0WM1JLLwhUb3l20KnEGU',
      town: 'Sekupang, Batam',
      completion: 'Dec 2025'
    }
  },
  {
    under_construction: true,
    img: 'https://opus-bay.com/wp-content/uploads/2023/02/State-Of-The-Art-Paradise-Image-Mob.png',
    name: 'MARCS BOULEVARD',
    description: 'Experience the height of sophistication in our stunning villas. Our villas are designed with the utmost attention to detail, featuring spacious living areas, private pools, and stunning views of the surrounding landscape.',
    company: {
      name: 'Trinity Land',
      caption: 'Begin Your Chapter',
      icon: 'https://yt3.googleusercontent.com/ytc/AIdro_kGXRWD4N1oes6WwamDmY4CkjbHRbcnbbVPcOG6_tBw7A=s900-c-k-c0x00ffffff-no-rj',
      town: 'Batam Centre, Batam',
      completion: 'Jan 2025'
    }
  },
  {
    under_construction: true,
    img: 'https://opus-bay.com/wp-content/uploads/2023/02/State-Of-The-Art-Paradise-Image-Mob.png',
    name: 'Orchard Park',
    description: 'Discover our selection of contemporary apartments located in the heart of the city. Our apartments are designed with the modern lifestyle in mind, featuring spacious living areas, modern kitchens, and stunning views of the cityscape.',
    company: {
      name: 'Agung Podomoro Land',
      caption: 'Keep Climbing Higher as An Integrated Property Developer',
      icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThyESxS58WU6qr3WtSvet0oZHlE9Q7Y9LA7A&s',
      town: 'Avemue Road, Batam',
      completion: 'Dec 2025'
    }
  },
]

</script>

<style scoped></style>
