<template>
    <div class="w-full min-h-svh flex items-center justify-center m-auto lg:max-w-xl px-12 py-14 md:px-16 md:py-20 overflow-y-auto">
        <div class="flex flex-col items-center justify-center w-full flex-1 shadow-2xl rounded-lg p-6 gap-6">
            <!-- Logo -->
            <div class=" w-full flex justify-start">
                <img class="w-20 h-10" src="/src/assets/images/LogoONEFlow.png"/>
            </div>
            <!-- Animation -->
            <div ref="lottieContainer" class="w-full h-auto flex justify-center"></div>
            <div class="w-full flex flex-col justify-center items-center">
                <h3 class="text-2xl text-center max-w-30">Thank you <span class="block">for your</span></h3>
                <h3 class="font-bold text-2xl ">Feedback!</h3>
            </div>
            
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Lottie from 'lottie-web';
import thankYouAnimation from '../assets/lottieJSON/thankYou.json'

const lottieContainer = ref(null)
onMounted(() => {
    Lottie.loadAnimation({
        container: lottieContainer.value, // the ref to attach the animation
        renderer: 'svg',                  // specify the renderer (svg, canvas, html)
        loop: true,                       // animation loops indefinitely
        autoplay: true,                   // start playing on load
        animationData: thankYouAnimation    // the JSON animation data
    })
})
</script>