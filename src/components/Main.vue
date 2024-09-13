<template>
    <div style="height: 100vh; position: fixed; top: 0; left: 0; right: 0; z-index: 0;">
        <!-- Gambar background -->
        <v-img
            src="https://admin1.the-gypsy.sg/img/app/50e0a0211569743c4e12032a33e87053.jpg"
            aspect-ratio="16/9"
            cover
            :class="['zoom-effect', { 'zoomed': isZoomed }]"
            style="height: 100%; z-index: 0; position: relative;"
        ></v-img>

        <!-- Overlay abu-abu dengan opacity -->
        <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0, 0, 0, 0.5); z-index: 1;"></div>

        <!-- Teks dan tombol di atas banner -->
        <v-row
            style="z-index: 2; position: absolute; top: 0; left: 0; right: 0; height: 100vh; margin-left: 10px; margin-top: 70px;"
            class="d-flex align-center"
        >
            <v-col
                cols="12"
                class="d-flex flex-column align-start"
                style="padding-left: 20px;"
            >
                <h1 style="color: #fff; font-size: 46px; font-weight: bold;">
                    Explore Homes for Sale & Rent
                </h1>
                <v-btn
                    @click="scrollToSection"
                    class="text-white v-btn v-btn--has-bg theme--light elevation-0 v-size--default mt-2"
                    style="background-color: #fa2964"
                >
                    Learn More
                </v-btn>
            </v-col>
        </v-row>
    </div>

    <div style="min-height: 100vh; position: relative; z-index: 2; background-color: #fff; margin-top: 100vh;">
        <v-container class="mx-auto px-4 medium:px-16" style="max-width: 1200px;">
            <Happening />
            <Residential />
            <Commercial />
            <CardItem />
            <Partners />
        </v-container>
        <Footer />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue' // Ensure these are imported
import Happening from './DesktopView/Happening/Happening.vue';
import { eventBus } from "@/util/bus";

const isZoomed = ref(false)
function scrollToSection() {
  eventBus.scrollToSection = "happeningTarget"; // Ganti dengan ID section yang diinginkan
}

onMounted(() => {
    setTimeout(() => {
        isZoomed.value = true
    }, 100) // Small delay to ensure the transition starts after mount
});

const handleIntersection = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
        }
    })
}

onMounted(() => {
    const observer = new IntersectionObserver(handleIntersection, {
        threshold: 0.1, // Trigger when 10% of the element is visible
    })

    const cards = document.querySelectorAll('.fade-in-up')
    cards.forEach(card => {
        observer.observe(card)
    })
})
</script>

<style>
.zoom-effect {
    transition: transform 10s ease-out;
}

.zoomed {
    transform: scale(1.1);
}

.fade-in-up {
    opacity: 0;
    transform: translateY(200px);
    transition: opacity 2s ease, transform 2s ease;
}

.fade-in-up.visible {
    opacity: 1;
    transform: translateY(0);
}

.featured-title {
    font-family: 'DM Serif Display';
}

.featured-sub-title {
    letter-spacing: 5px;
}
</style>
