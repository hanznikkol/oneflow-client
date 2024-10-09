<template>
    <div class="w-full flex flex-row justify-start items-center gap-3">
      <!-- (Very Bad) -->
      <div class="transition-colors duration-300 " @click = "toggleReaction('Very Bad')">
        <component
          :is="reaction === 'Very Bad' ? IconVeryBadFill : IconVeryBadStroke"
          class="w-7 h-7"
        />
      </div>

      <!-- (Bad) -->
      <div class="transition-colors duration-300 " @click = "toggleReaction('Bad')">
        <component
          :is="reaction === 'Bad' ? IconBadFill : IconBadStroke"
          class="w-7 h-7"
        />
      </div>

      <!-- Neutral -->
      <div class="transition-colors duration-300 " @click = "toggleReaction('Neutral')">
        <component
          :is="reaction === 'Neutral' ? IconNeutralFill : IconNeutralStroke"
          class="w-7 h-7"
        />
      </div>

      <!-- (Good) -->
      <div class="transition-colors duration-300 " @click ="toggleReaction('Good')">
        <component
          :is="reaction === 'Good' ? IconGoodFill : IconGoodStroke"
          class="w-7 h-7"
        />
      </div>

      <!-- (Very Good) -->
      <div class="transition-colors duration-300 " @click = "toggleReaction('Very Good')">
        <component
          :is="reaction === 'Very Good' ? IconVeryGoodFill : IconVeryGoodStroke"
          class="w-7 h-7"
        />
      </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

// Fill icons
import IconVeryBadFill from '../icons/feedback_icons/fill/IconVeryBadFill.vue';
import IconBadFill from '../icons/feedback_icons/fill/IconBadFill.vue';
import IconNeutralFill from '../icons/feedback_icons/fill/IconNeutralFill.vue';
import IconGoodFill from '../icons/feedback_icons/fill/IconGoodFill.vue';
import IconVeryGoodFill from '../icons/feedback_icons/fill/IconVeryGoodFill.vue';

// Stroke icons
import IconVeryBadStroke from '../icons/feedback_icons/stroke/IconVeryBadStroke.vue';
import IconBadStroke from '../icons/feedback_icons/stroke/IconBadStroke.vue';
import IconNeutralStroke from '../icons/feedback_icons/stroke/IconNeutralStroke.vue';
import IconGoodStroke from '../icons/feedback_icons/stroke/IconGoodStroke.vue';
import IconVeryGoodStroke from '../icons/feedback_icons/stroke/IconVeryGoodStroke.vue';


const props = defineProps({
    reaction: {
        type: String,
        required: true,
        default: ''
    }
})

const emit = defineEmits(['update:reaction'])

const toggleReaction = (newReaction) => {
  // If the clicked reaction is the same as the current one, reset it
  emit('update:reaction', props.reaction === newReaction ? '' : newReaction);
};
</script>
