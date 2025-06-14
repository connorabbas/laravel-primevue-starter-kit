import { createInertiaApp, Head, Link } from '@inertiajs/vue3';
import createServer from '@inertiajs/vue3/server';

import { renderToString } from '@vue/server-renderer';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createSSRApp, h } from 'vue';

import { route as ziggyRoute } from 'ziggy-js';

import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';

import Container from '@/components/Container.vue';
import PageTitleSection from '@/components/PageTitleSection.vue';
import { useSiteColorMode } from '@/composables/useSiteColorMode';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createServer((page) =>
    createInertiaApp({
        page,
        render: renderToString,
        title: (title) => `${title} - ${appName}`,
        resolve: (name) => resolvePageComponent(
            `./pages/${name}.vue`,
            import.meta.glob('./pages/**/*.vue')
        ),
        setup({ App, props, plugin }) {
            // Color mode set from cookie on the server
            const cookieColorMode = props.initialPage.props.colorScheme;
            const colorMode = useSiteColorMode({
                cookieColorMode,
                emitAuto: true,
            });

            // Global Toast component
            const Root = {
                setup() {
                    return () => h('div', [
                        h(App, props),
                        h(Toast, { position: 'bottom-right' })
                    ]);
                }
            };

            // Create app
            const app = createSSRApp(Root);

            // Configure Ziggy for SSR
            const ziggyConfig = {
                ...page.props.ziggy,
                location: new URL(page.props.ziggy.location),
            };
            const route = (name, params, absolute) => ziggyRoute(name, params, absolute, ziggyConfig);
            app.config.globalProperties.route = route;
            if (typeof window === 'undefined') {
                global.route = route;
            }

            app.use(plugin)
                .use(PrimeVue, { theme: 'none' }) // PrimeVue won't render it's styles server side
                .use(ToastService)
                .component('InertiaHead', Head)
                .component('InertiaLink', Link)
                .component('Container', Container)
                .component('PageTitleSection', PageTitleSection)
                .provide('colorMode', colorMode);

            return app;
        },
    })
);
