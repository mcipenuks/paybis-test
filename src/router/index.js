import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/:lang?',
            name: 'home',
            component: Home
        }
    ]
});

export default router;
