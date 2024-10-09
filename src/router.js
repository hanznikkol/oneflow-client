import { createRouter, createWebHistory } from "vue-router"

import Main from './components/Main.vue'
import Feedback from './components/Feedback.vue'
import FeedbackComplete from "./components/FeedbackComplete.vue"

const routes = [
    {path: '/queue-view', component: Main},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router