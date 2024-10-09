<template>
    <Feedback v-if="ticket.ticketID && ticket.status === 'Completed'" :ticketID = "ticket.ticketID"></Feedback>
    <div v-if="ticket.ticketID && ticket.status === 'Open'" class="w-full min-h-svh flex justify-center m-auto lg:max-w-xl py-10 px-12 md:px-14 md:py-16 overflow-y-auto">
        <div class="flex flex-col justify-center items-center w-full min-h-full gap-4 ">
            <!-- Dynamic Icons, Customer and Service Label -->
            <div :class= "ticket.status === 'Completed' ? 'hidden' : 'h-auto w-full block'"
            >
                <DynamicCustomer :serviceType="selectedService" :services = "services"/>
            </div>

            <!-- Ticket Frame -->
            <div :class= "ticket.status === 'Completed' ? 'hidden' : 'w-40 h-40 block'" class="">
                <component class="w-full h-full flex flex-col" :is = "TicketFrame">
                    <p class="text-xs text-center">Your Ticket No. is:</p>
                    <h1 class="text-3xl font-bold">{{ `${ticket.adminType}-${ticket.ticketNumber}` }}</h1>
                </component>
            </div>

            <!-- Current Queue Container -->
            <div class="w-full h-full border-2 border-primary rounded-lg p-4">

                <!-- Main Queue Content -->
                <div v-if="ticket.status === 'Open' || ticket.status === 'Hold'" class="flex flex-col justify-around items-center w-full h-full ">
                    <!-- Label -->
                    <h1 class="font-bold text-xl">Current Queue:</h1>

                    <!-- Queues -->
                    <div class="w-full h-auto flex flex-row items-center justify-around">
                        <!-- Queue Current Items -->
                        <QueueCurrentItems v-for="counter in ticketData.currentServingTickets" :estWaitTime="ticketData.estWaitingTime" 
                        :isPending="ticket.services?.filter(s=>s.adminType === counter.adminType).every(s=>s.status === 'Pending')"
                        :isAbandoned="ticket.services?.filter(s=>s.adminType === counter.adminType).every(s=>s.status === 'Abandoned')"
                        :isCompleted="ticket.services?.filter(s=>s.adminType === counter.adminType).every(s=>s.status === 'Completed')"
                        :servingTicket="counter"/>
                    </div>
                </div>

                <!-- Proceed Container-->
                <div v-if = "ticket.status === 'Serving'" class="flex flex-col justify-evenly items-center w-full h-full ">
                    <!-- Icon -->
                    <div class="flex justify-center items-center w-16 h-16">
                        <component class="w-full h-full" :is="IconProceed"/>
                    </div>
                    <!-- Text -->
                    <div class="w-full h-auto flex flex-col items-center justify-center">
                        <p class="text-xs">It's your turn</p>
                        <h1 class="font-bold">Proceed to {{ `${getCounterName(ticket.services?.find(s=>s.processedBy && (s.status != 'Completed' && s.status != 'Abandoned')))} `}}</h1>
                    </div>
                </div>

                <!-- Proceed Container-->
                <div v-if = "ticket.status === 'Completed'" class="flex flex-col justify-evenly items-center w-full h-full">
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
import { computed, onMounted, onUnmounted, ref } from 'vue';
//Icons
import TicketFrame from './icons/TicketFrame.vue';
//Components
import DynamicCustomer from './subcomponents/DynamicCustomer.vue';
import QueueCurrentItems from './subcomponents/QueueCurrentItems.vue';
//Icons
import IconAnnounce from './icons/IconAnnounce.vue';
import IconProceed from './icons/IconProceed.vue';
import IconOK from './icons/IconOK.vue';
import Feedback from './Feedback.vue'
import { useRoute, useRouter } from 'vue-router';
import { socket, state } from '../../socket';
const selectedService = computed(() => ticket.value.customerType ? ticket.value.customerType : 'N/A')
const services = computed(() => ticket.value.services ? ticket.value.services.map(service => service.serviceName) : [])
const ticketData = ref({})
const ticket = computed(() => ticketData.value.ticket || {})

const router = useRouter()
const route = useRoute()

const getCounterName = (service) => {
    const counter = service.adminType === 'C' ? 'Cashier' : service.adminType === 'R' ? 'Registrar' : 'Admission'
    return `${counter} ${service.counterNo}`
} 

const getTicket = async (ticketCode) => {
    try{
        const request = `/api/ticket?tc=${ticketCode}`
        const response = await fetch(request, {
            method: 'GET'
        })
        const data = await response.json()
        if(!response.ok) return alert(data.error)
        return data
    }
    catch(err) {
        console.error(err)
    }
}

const onCallTicket = (calledTicket, adminType) => {
    // get the called ticket number
    const ticketNumber = `${calledTicket.adminType}-${calledTicket.ticketNumber}`
    // update the counter
    const servingTicket = ticketData.value.currentServingTickets.find(t => t.adminType == adminType)
    if(servingTicket) {
        servingTicket['Current Serving'] = ticketNumber
        const currTicketNumber = `${ticket.value.adminType}-${ticket.value.ticketNumber}`
        // Get latest est waiting Time
        socket.emit('estWaitingTime', ticket.value, (estWaitingTime)=>{
            ticketData.value.estWaitingTime = estWaitingTime
        })
        if(ticketNumber === currTicketNumber){
            // replace the current serving ticket with the new called ticket
            // update the est waiting Time
            ticketData.value.ticket = calledTicket
        }
    }
}
const onHoldTicket = (heldTicket, adminType) => {
    // get the called ticket number
    const ticketNumber = `${heldTicket.adminType}-${heldTicket.ticketNumber}`

    // update the counter
    const servingTicket = ticketData.value.currentServingTickets.find(t => t.adminType == adminType)
    if(servingTicket) {
        servingTicket['Current Serving'] = '...'
        const currTicketNumber = `${ticket.value.adminType}-${ticket.value.ticketNumber}`
        if(ticketNumber === currTicketNumber){
            // replace the current serving ticket with the new called ticket
            ticketData.value.ticket = heldTicket
        }
    }
}
const onCompleteTicket = (completeTicket, adminType) => {
    // get the called ticket number
    const ticketNumber = `${completeTicket.adminType}-${completeTicket.ticketNumber}`
    // update the counter
    const servingTicket = ticketData.value.currentServingTickets.find(t => t.adminType == adminType)
    if(servingTicket) {
        servingTicket['Current Serving'] = '...'
        const currTicketNumber = `${ticket.value.adminType}-${ticket.value.ticketNumber}`
        if(ticketNumber === currTicketNumber){
            // replace the current serving ticket with the new called ticket
            ticketData.value.ticket = completeTicket
            const completed = completeTicket.services.every(s => s.status === 'Completed' || s.status === 'Abandoned')
        }
    }
}


onMounted(async () => {
    if(!route.query.tc || route.query.tc === undefined) return 

    // fetch client ticket if code is provided 
    ticketData.value = await getTicket(route.query.tc)
    if(ticketData.value){
        socket.on('callTicket', onCallTicket)
        socket.on('holdTicket', onHoldTicket)
        socket.on('completeTicket', onCompleteTicket)
    }
})

onUnmounted(()=> {
    socket.off('callTicket')
    socket.off('holdTicket')
    socket.off('completeTicket')
})




</script>
