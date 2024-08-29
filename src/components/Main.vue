<template>
    <div class="w-full min-h-screen flex justify-center bg-red-100 m-auto lg:max-w-xl p-12">
        <div class="flex flex-col justify-center items-center w-full min-h-full gap-4 bg-slate-100">
            <!-- Dynamic Icons, Customer and Service Label -->
            <div>
                <DynamicCustomer :serviceType="selectedService" :services = "serviceItems"/>
            </div>
            <!-- Ticket Frame -->
            <div class=" w-36 h-36">
                <component class="w-36 h-36" :is = "TicketFrame"/>
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

const selectedService = ref('priority')

const serviceItems = [
    'Tuition Payment',
    'Clearance'
]
</script>
