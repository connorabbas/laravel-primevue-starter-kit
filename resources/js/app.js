import '../css/app.css';
import '../css/tailwind.css';

import { createSSRApp, h } from 'vue';
import { createInertiaApp, router, Head, Link } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from '../../vendor/tightenco/ziggy';

import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import { useToast } from 'primevue/usetoast';
import Toast from 'primevue/toast';

import Container from '@/components/Container.vue';
import PageTitleSection from '@/components/PageTitleSection.vue';

import { useSiteColorMode } from '@/composables/useSiteColorMode';
import themePreset from '@/theme/noir-preset';
import globalPt from '@/theme/global-pt';

/* global Ziggy */
const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./pages/${name}.vue`,
            import.meta.glob('./pages/**/*.vue')
        ),
    setup({ el, App, props, plugin }) {
        // Site light/dark mode
        const colorMode = useSiteColorMode({ emitAuto: true });

        // Global Toast component
        const Root = {
            setup() {
                // show error toast instead of standard Inertia modal response
                const toast = useToast();
                router.on('invalid', (event) => {
                    const responseBody = event.detail.response?.data;
                    if (responseBody?.error_summary && responseBody?.error_detail) {
                        event.preventDefault();
                        toast.add({
                            severity: event.detail.response?.status >= 500 ? 'error' : 'warn',
                            summary: responseBody.error_summary,
                            detail: responseBody.error_detail,
                            life: 5000,
                        });
                    }
                });

                return () => h('div', [
                    h(App, props),
                    h(Toast, { position: 'bottom-right' })
                ]);
            }
        };

        const app = createSSRApp(Root)
            .use(plugin)
            .use(ZiggyVue, Ziggy)
            .use(PrimeVue, {
                theme: {
                    preset: themePreset,
                    options: {
                        darkModeSelector: '.dark',
                        cssLayer: {
                            name: 'primevue',
                            order: 'tailwind-theme, tailwind-base, primevue, tailwind-utilities',
                        },
                    },
                },
                pt: globalPt,
            })
            .use(ToastService)
            .component('InertiaHead', Head)
            .component('InertiaLink', Link)
            .component('Container', Container)
            .component('PageTitleSection', PageTitleSection)
            .provide('colorMode', colorMode)
            .mount(el);

        // #app content set to hidden by default
        // reduces jumpy initial render from SSR content (unstyled PrimeVue components)
        el.style.visibility = 'visible';

        return app;
    },
    progress: {
        color: 'var(--p-primary-500)',
    },
});
