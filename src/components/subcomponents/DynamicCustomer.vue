<template>
    <div class="flex flex-col justify-center items-center gap-2">
        <!-- Icons -->
        <div class="flex flex-row justify-around items-center">
            <div v-for="icon in displayedIcons" :key="icon.name" class="w-6 h-6">
                <component :is="icon.component" />
            </div>
        </div>

        <!-- Customer Label -->
        <h1 class="text-sm font-medium">{{ customerLabel }}</h1>

        <!-- Services -->
        <div class="">
            <h1 class="text-sm font-medium">{{ formattedServices }}</h1>
        </div>
        
    </div>
     
</template>

<script setup>
import { computed } from 'vue';
import IconPriority1 from '../icons/IconPriority1.vue';
import IconPriority2 from '../icons/IconPriority2.vue';
import IconPriority3 from '../icons/IconPriority3.vue';
import IconRegularCustomer from '../icons/IconRegularCustomer.vue';

const icons = {
    Priority: [
        {name: 'IconPriority1', component: IconPriority1},
        {name: 'IconPriority2', component: IconPriority2},
        {name: 'IconPriority3', component: IconPriority3},
    ],
    Regular: [
        {name: 'IconRegular', component: IconRegularCustomer},
    ]
}

const props = defineProps({
    serviceType: {
        type: String,
        default: 'regular'
    },
    services: {
        type: Array,
        default: () => []
    }
})

const displayedIcons = computed(() => {
  return icons[props.serviceType] || [];
});

const customerLabel = computed(() => {
    switch (props.serviceType){
        case 'Priority':
            return 'Priority Customer'
        case 'Regular':
            return 'Regular Customer'
        default:
            return ''
    }
})

const formattedServices = computed(() => {
  if (Array.isArray(props.services)) {
    return props.services.join(' + ');
  }
  return '';
});
</script>