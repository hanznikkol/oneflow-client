<template>
    <div class="w-full min-h-svh flex items-center justify-center m-auto lg:max-w-xl px-12 py-14 md:px-20 md:py-24 overflow-y-auto">
        <div class="flex flex-col items-center justify-center w-full flex-1 shadow-2xl rounded-lg p-6 gap-6">
            <!-- Icon -->
            <div class="w-full h-auto flex justify-center">
                <component class="w-36 h-36" :is="IconHandHeart"/>
            </div>
            <h3 class="text-2xl text-center">Thank you for your <span class="font-bold">Feedback!</span></h3>
        </div>
    </div>
</template>

<script setup>
import IconHandHeart from './icons/feedback_icons/IconHandHeart.vue';
</script>