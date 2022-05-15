import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import i18n from '@/i18n';

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

router.beforeEach((to, from, next) => {
    const { lang } = to.params;
    if (lang) {
        i18n.global.locale = lang;
    }

    next();
});

export default router;
