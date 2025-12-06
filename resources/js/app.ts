import '../css/app.css'
import '../css/tailwind.css'

import { createInertiaApp, router } from '@inertiajs/vue3'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { createSSRApp, DefineComponent, h } from 'vue'
import { ZiggyVue } from 'ziggy-js'

import PrimeVue from 'primevue/config'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'
import { useToast } from 'primevue/usetoast'

import { useSiteColorMode } from '@/composables/useSiteColorMode'
import globalPt from '@/theme/global-pt'
import themePreset from '@/theme/noir-preset'

const appName = import.meta.env.VITE_APP_NAME || 'Laravel'

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./pages/${name}.vue`,
            import.meta.glob<DefineComponent>('./pages/**/*.vue'),
        ),
    setup({ el, App, props, plugin }) {
        // Site light/dark mode
        const colorMode = useSiteColorMode({ emitAuto: true })

        // Root component with Global Toast
        const Root = {
            setup() {
                // show error toast instead of standard Inertia modal response
                const toast = useToast()
                router.on('invalid', (event) => {
                    const responseBody = event.detail.response?.data
                    if (responseBody?.error_summary && responseBody?.error_detail) {
                        event.preventDefault()
                        toast.add({
                            severity: event.detail.response?.status >= 500 ? 'error' : 'warn',
                            summary: responseBody.error_summary,
                            detail: responseBody.error_detail,
                            life: 5000,
                        })
                    }
                })

                return () => h('div', [
                    h(App, props),
                    h(Toast, { position: 'bottom-right' })
                ])
            }
        }

        createSSRApp(Root)
            .use(plugin)
            .use(ZiggyVue)
            .use(PrimeVue, {
                theme: {
                    preset: themePreset,
                    options: {
                        darkModeSelector: '.dark',
                        cssLayer: {
                            name: 'primevue',
                            order: 'theme, base, primevue, utilities',
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
