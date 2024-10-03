<template>
    <!-- Props that passed on:
            Must: 
            - Text
            Optional to Change:
            - textClass
            - sizeClass
            - bgColorClass
            - outlineClass
            - buttonRadius
            - shadowClass
            - icons
        -->
    <button :class="[
        'duration-100 active:scale-[1.05] flex justify-center items-center select-none',
        buttonProps.buttonRadius,
        buttonProps.textClass,
        buttonProps.sizeClass,
        buttonProps.bgColorClass,
        buttonProps.outlineClass,
        buttonProps.shadowClass
    ]">
    <!-- Icon on the left -->
    <div v-if="buttonProps.icon" class="mr-2">
            <component class="w-4 h-4" :is="buttonProps.icon"/>
    </div>

    <!-- Title Text -->
    {{ buttonProps.text }}
    </button>
</template>

<script setup>
    const buttonProps  = defineProps({
        //Title Text
        text: {
            type: String,
            required: true
        },
        //Fonts and Text Color
        textClass: {
            type: String,
            default: 'text-black text-base md:text-2xl lg:md:text-4xl font-bold'
        },
        //Width, Height, and Paddings
        sizeClass: {
            type: String,
            default: 'w-full py-4 lg:py-6'
        },
        //Changes in Background Color
        bgColorClass: {
            type: String,
            default: 'bg-secondary hover:bg-[#E5D100]'
        },
        //Outline
        outlineClass: {
            type: String,
            default: ''
        },
        //BorderRadius
        buttonRadius: {
            type: String,
            default: 'rounded-2xl'
        },
        //Background Shadow
        shadowClass: {
            type: String,
            default: 'shadow-sm'
        },
        //Icons
        icon: {
            type: [Object, Function],
            default: null
        }
    })
</script>
