<template>
    <div class="flex flex-col justify-center items-center">
        <!-- Current Queue -->
        <h4 class="text-xs">{{counterName}}</h4>
        <h3 class="font-bold mb-4 text-2xl">{{servingTicket['Current Serving']}}</h3>
        <!-- Estimated Time -->
        <div v-if="isPending" class="w-full h-full flex flex-col items-center justify-between">
            <p class="font-bold text-xs">Est.</p>
            <h4 class="font-bold text-sm">{{ currentEstWaitingTime }}</h4>
        </div>
        <div v-else-if="isAbandoned" class="w-full h-full flex flex-col items-center justify-between">
            <p class="font-bold text-xs text-red-600">Service</p>
            <h4 class="font-bold text-sm text-red-600">Abandoned</h4>
        </div>
        <div v-else-if="isCompleted" class="w-full h-full flex flex-col items-center justify-between">
            <p class="font-bold text-xs text-green-400">Service</p>
            <h4 class="font-bold text-sm text-green-400">Completed</h4>
        </div>
        <div v-else class="w-full h-full flex flex-col items-center justify-between">
            <p class="font-bold text-xs">Your ticket is Held.</p>
            <h4 class="text-xs">Proceed to {{ counterName }}</h4>
        </div>
    </div>
</template>
<script setup>
import moment from 'moment';
import { computed, ref } from 'vue';
const props = defineProps({
    servingTicket: {
        type: Object,
    },
    estWaitTime: {
        type: Array,
    },
    isPending: {
        type: Boolean,
        default: false,
    },
    isAbandoned:{
        type: Boolean,
        default: false,
    },
    isCompleted:{
        type: Boolean,
        default: false,
    }
})

const counterName = computed(() => props.servingTicket?.adminType === 'C' ? 'Cashier' : props.servingTicket?.adminType === 'R' ? 'Registrar' : 'Admission')

const currentEstWaitingTime = computed(() =>  {
    const estWaitingTime = props.estWaitTime.find(e=>e.adminType === props.servingTicket.adminType)
    return estWaitingTime ? convertTimeFormat(estWaitingTime.estWaitingTime) : '...'
})

function convertTimeFormat(timeStr) {
  const momentDuration = moment.duration(timeStr);

  const hours = momentDuration.hours();
  const minutes = momentDuration.minutes();
  const seconds = momentDuration.seconds();

  // If more than 60 minutes
  if (hours > 0) {
    return hours + (hours === 1 ? ' hour' : ' hours') + ' ' +  minutes + (minutes === 1 ? ' min' : ' mins');
  }

  // If between 60 seconds and 59 minutes
  if (minutes > 0) {
    return minutes + (minutes === 1 ? ' min' : ' mins') + ' ' + seconds + (seconds === 1 ? ' sec' : ' secs');
  }

  // If less than 60 seconds
  return seconds + (seconds === 1 ? ' sec' : ' secs');
}


    
</script>