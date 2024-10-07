import { createRouter, createWebHistory } from "vue-router"

import Main from './components/Main.vue'
import Feedback from './components/Feedback.vue'

const routes = [
    {path: '/queue-view', component: Main},
    {path: '/queue-view/feedback', component: Feedback}
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router