<template>
    <div class="w-full min-h-svh flex justify-center m-auto lg:max-w-xl py-10 px-12 md:px-14 md:py-16 overflow-y-auto">
        <div class="flex flex-col justify-center items-center w-full min-h-full gap-4 ">
            <!-- Dynamic Icons, Customer and Service Label -->
            <div :class= "progress === 'Complete' ? 'hidden' : 'h-auto w-full block'"
            >
                <DynamicCustomer :serviceType="selectedService" :services = "serviceItems"/>
            </div>

            <!-- Ticket Frame -->
            <div :class= "progress === 'Complete' ? 'hidden' : 'w-40 h-40 block'" class="">
                <component class="w-full h-full flex flex-col" :is = "TicketFrame">
                    <p class="text-xs text-center">Your Ticket No. is:</p>
                    <h1 class="text-2xl font-bold">M-12</h1>
                </component>
            </div>

            <!-- Current Queue Container -->
            <div class="w-full h-full border-2 border-primary rounded-lg p-4">

                <!-- Main Queue Content -->
                <div v-if="progress === 'Waiting'" class="flex flex-col justify-around items-center w-full h-full ">
                    <!-- Label -->
                    <h1 class="font-bold text-xl">Current Queue:</h1>

                    <!-- Queues -->
                    <div class="w-full h-auto flex flex-row items-center justify-around">
                        <!-- Queue Current Items -->
                        <QueueCurrentItems/>
                        <QueueCurrentItems/>
                        <QueueCurrentItems/>
                    </div>
                </div>

                <!-- Proceed Container-->
                <div v-if = "progress === 'Proceed'" class="flex flex-col justify-evenly items-center w-full h-full ">
                    <!-- Icon -->
                    <div class="flex justify-center items-center w-16 h-16">
                        <component class="w-full h-full" :is="IconProceed"/>
                    </div>
                    <!-- Text -->
                    <div class="w-full h-auto flex flex-col items-center justify-center">
                        <p class="text-xs">It's your turn</p>
                        <h1 class="font-bold">Proceed to Cashier</h1>
                    </div>
                </div>

                <!-- Proceed Container-->
                <div v-if = "progress === 'Complete'" class="flex flex-col justify-evenly items-center w-full h-full">
                    <!-- Icon -->
                    <div class="flex justify-center items-center w-20 h-20">
                        <component class="w-full h-full" :is="IconOK"/>
                    </div>
                    <!-- Text -->
                    <div class="w-full h-auto flex flex-col items-center justify-center">
                        <h1 class="font-bold text-lg">Your Service is Complete</h1>
                    </div>
                </div>
            </div>

            <!-- Announcement -->
            <div class="w-full h-full flex flex-col items-center justify-center">
                <h1 class="font-bold text-lg">Thank you for waiting!</h1>
                <!-- Image -->
                <div class="w-28 h-28 flex justify-center p-4">
                    <component class="w-full h-full" :is="IconAnnounce"/>
                </div>
                <!-- Label -->
                <div class="flex">
                    <p class="text-center text-sm font-semibold ">We are having our lunch break in 12 minutes</p>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
//Icons
import TicketFrame from './icons/TicketFrame.vue';
//Components
import DynamicCustomer from './subcomponents/DynamicCustomer.vue';
import QueueCurrentItems from './subcomponents/QueueCurrentItems.vue';
//Icons
import IconAnnounce from './icons/IconAnnounce.vue';
import IconProceed from './icons/IconProceed.vue';
import IconOK from './icons/IconOK.vue';
const selectedService = ref('priority')

const progress = "Proceed"

const serviceItems = [
    'Tuition Payment',
    'Clearance'
]
</script>
