import './bootstrap';
import '../css/app.css';
import '../css/tailwind.css';
import 'primeicons/primeicons.css';

import { createApp, h } from 'vue';
import { createInertiaApp, Head, Link } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from '../../vendor/tightenco/ziggy';

import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import Container from '@/Components/Container.vue';

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
            .provide('darkMode', darkMode)
            .use(plugin)
            .use(ZiggyVue)
            .use(PrimeVue, {
                theme: 'none',
            })
            .use(ToastService)
            .component('InertiaHead', Head)
            .component('InertiaLink', Link)
            .component('AuthenticatedLayout', AuthenticatedLayout)
            .component('Container', Container)
            .mount(el);
    },
    progress: {
        color: 'var(--p-primary-500)',
    },
});
