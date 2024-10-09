<template>
    <div class="relative w-full h-full">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 350 304">
        <path fill="#00306E" fill-rule="evenodd" d="M0 25c13.807 0 25-11.193 25-25h300c0 13.807 11.193 25 25 25v77c-27.614 0-50 22.386-50 50s22.386 50 50 50v77c-13.807 0-25 11.193-25 25H25c0-13.807-11.193-25-25-25v-77c27.614 0 50-22.386 50-50s-22.386-50-50-50V25Z" clip-rule="evenodd"/>
        </svg>
        <div class="absolute inset-0 flex flex-col justify-center items-center gap-4 text-white">
            <slot></slot>
        </div>
    </div>
    
</template>