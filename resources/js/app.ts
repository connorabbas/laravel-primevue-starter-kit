import '../css/app.css'
import '../css/tailwind.css'

import { createInertiaApp } from '@inertiajs/vue3'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { createSSRApp, DefineComponent, h } from 'vue'
import { useInertiaRouterEvents } from '@/composables/useInertiaRouterEvents'

import PrimeVue from 'primevue/config'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'

import { useSiteColorMode } from '@/composables/useSiteColorMode'
import globalPt from '@/theme/global-pt'
import themePreset from '@/theme/noir-preset'

const appName = import.meta.env.VITE_APP_NAME || 'Laravel'

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) =>
        resolvePageComponent(
            `./pages/${name}.vue`,
            import.meta.glob<DefineComponent>('./pages/**/*.vue'),
        ),
    setup({ el, App, props, plugin }) {
        // Site light/dark mode
        const colorMode = useSiteColorMode({ emitAuto: true })

        // Root template with global toast component
        const Root = {
            setup() {
                // Inertia router events for Error toast handling, flash data, etc.
                useInertiaRouterEvents()

                return () => h('div', [
                    h(App, props),
                    h(Toast, { position: 'bottom-right' })
                ])
            }
        }

        createSSRApp(Root)
            .use(plugin)
            .use(PrimeVue, {
                theme: {
                    preset: themePreset,
                    options: {
                        darkModeSelector: '.dark',
                        cssLayer: {
                            name: 'primevue',
                            order: 'theme, base, primevue',
                        },
                    },
                },
                pt: globalPt,
            })
            .use(ToastService)
            .provide('colorMode', colorMode)
            .mount(el);

        // #app content set to hidden by default
        // reduces jumpy initial render from SSR content (unstyled PrimeVue components)
        (el as HTMLElement).style.visibility = 'visible'
    },
    progress: {
        color: 'var(--p-primary-500)',
    },
})
