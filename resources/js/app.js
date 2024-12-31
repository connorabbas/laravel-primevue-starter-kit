import './bootstrap';
import '../css/app.css';
import 'primeicons/primeicons.css';

import { createApp, h } from 'vue';
import { createInertiaApp, Head, Link } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from '../../vendor/tightenco/ziggy';

import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';

import customThemePreset from '@/theme-preset.js';
import { useDark } from '@vueuse/core';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';
const darkMode = useDark(); // set Light/Dark Mode

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.vue`,
            import.meta.glob('./Pages/**/*.vue')
        ),
    setup({ el, App, props, plugin }) {
        return createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(ZiggyVue, Ziggy)
            .use(PrimeVue, {
                theme: customThemePreset,
            })
            .use(ToastService)
            .component('Head', Head)
            .component('Link', Link)
            .mount(el);
    },
    progress: {
        color: 'var(--p-primary-500)',
    },
});
