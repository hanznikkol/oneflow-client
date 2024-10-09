<template>
    <!-- Feedback Complete -->
    <FeedbackComplete v-if="showCompleted"></FeedbackComplete>
    <div v-if="!showCompleted" class="w-full min-h-svh flex justify-center m-auto lg:max-w-xl px-12 py-14 md:px-20 md:py-24 overflow-y-auto">
        <div class="flex flex-col items-center justify-between w-full flex-1 shadow-2xl rounded-lg p-6 gap-6">
            <!-- Logo -->
            <div class=" w-full flex justify-start">
                <img class="w-20 h-10" src="/src/assets/images/LogoONEFlow.png"/>
            </div>

            <!-- Text -->
            <div class="flex flex-col w-full gap-1">
                <h1 class="text-lg font-bold">Give Feedback</h1>
                <p class="text-xs">How was your queue experience?</p>
            </div>

            <!-- Reaction Buttons -->
            <ReactionContainer
                v-model:reaction="userReaction"
            />    

            <!-- Form -->
            <div class="w-full h-full flex flex-col gap-2">
                <label for="feedback" class="text-xs">Tell us what you like and what we could improve</label>
                <textarea 
                    id="feedback"
                    v-model = "feedback"
                    rows="6"
                    class="text-xs w-full h-full flex-1 p-2 rounded-lg placeholder:text-label-gray placeholder:italic resize-none border-2 border-primary"
                    placeholder="Write your experience..." 
                    @input="updateCharCount"    
                />
                <small class="text-xs text-label-gray">{{ charCount }}/1000</small>
            </div>
            <div class="w-full h-auto flex flex-row gap-2">
                <ButtonContainer
                    textClass = "text-sm font-bold"
                    sizeClass = "p-3 w-full"
                    bgColorClass = "bg-pure-white hover:bg-light-gray"
                    buttonRadius = "rounded-md"
                    outlineClass = "outline outline-1"
                    text = "No Thanks"
                />
                <ButtonContainer
                    text = "Send"
                    @click="handleAddFeedback"
                    textClass = "text-sm text-black font-bold"
                    sizeClass = "p-3 w-full"
                    buttonRadius = "rounded-md"
                    shadowClass = "shadow-2xl"
                />
            </div>
        </div>
    </div>
</template> 

<script setup>
import { onMounted, ref } from 'vue';
import ReactionContainer from './subcomponents/ReactionContainer.vue';
import ButtonContainer from './icons/ButtonContainer.vue';
import FeedbackComplete from './FeedbackComplete.vue';

const props = defineProps({
    ticketID: {
        type: Number
    }
})

const showCompleted = ref(false)
const userReaction = ref('');
const feedback = ref('')
const charCount = ref(0); // Character count
const updateCharCount = () => {
  if (feedback.value.length > 1000) {
    feedback.value = feedback.value.substring(0, 1000); // Limit input
  }
  charCount.value = feedback.value.length; // Update character count
};


const addFeedback = async(ticketID) => {
    try{
        const request = `/api/feedbacks`
        const response = await fetch(request, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }, 
            body: JSON.stringify({ticketID: ticketID, reaction: userReaction.value, feedback: feedback.value})
        })
        const data = await response.json()
        if(!response.ok) return alert(data.error)
        return data.created
    }
    catch(err){
        console.error(err)
    }
}

const getExistingFeedback = async(ticketID) => {
    try{
        const request = `/api/feedbacks/${ticketID}`
        const response = await fetch(request, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data = await response.json()
        if(!response.ok) return alert(data.error)
        return data.feedback
    }
    catch(err){
        console.error(err)
    }
}

const handleAddFeedback = async () => {
    const created = await addFeedback(props.ticketID)
    if(created) showCompleted.value = true
}

onMounted(async() => {
    const existingFeedback = await getExistingFeedback(props.ticketID)
    console.log(existingFeedback)
    if(existingFeedback) showCompleted.value = true;
})

</script>
