<template>
    <div class="w-full min-h-screen flex justify-center items-center p-4 ">
        <div ref="lottieContainer" class="w-50 h-50"></div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Lottie from 'lottie-web';
import checkAnimation from '../assets/lottieJSON/check.json'

const lottieContainer = ref(null)
onMounted(() => {
    //Lottie
    Lottie.loadAnimation({
        container: lottieContainer.value, // the ref to attach the animation
        renderer: 'svg',                  // specify the renderer (svg, canvas, html)
        loop: false,                       // animation loops indefinitely
        autoplay: true,                   // start playing on load
        animationData: checkAnimation    // the JSON animation data
    });
})
</script>