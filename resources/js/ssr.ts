import { createInertiaApp } from '@inertiajs/vue3'
import createServer from '@inertiajs/vue3/server'

import { renderToString } from '@vue/server-renderer'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { createSSRApp, DefineComponent, h } from 'vue'

import PrimeVue from 'primevue/config'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'

import { useSiteColorMode } from '@/composables/useSiteColorMode'

const appName = import.meta.env.VITE_APP_NAME || 'Laravel'

createServer((page) =>
    createInertiaApp({
        page,
        render: renderToString,
        title: (title) => (title ? `${title} - ${appName}` : appName),
        resolve: (name) => resolvePageComponent(
            `./pages/${name}.vue`,
            import.meta.glob<DefineComponent>('./pages/**/*.vue'),
        ),
        setup({ App, props, plugin }) {
            // Site light/dark mode, set from cookie for SSR
            const cookieColorMode = props.initialPage.props.colorScheme
            const colorMode = useSiteColorMode({
                cookieColorMode,
                emitAuto: true,
            })

            return createSSRApp({
                render: () => h('div', [
                    // Root template with global toast component
                    h(App, props),
                    h(Toast, { position: 'bottom-right' })
                ])
            })
                .use(plugin)
                .use(PrimeVue, { theme: 'none' }) // PrimeVue won't render it's styles server side, @see https://github.com/primefaces/primevue/issues/7289
                .use(ToastService)
                .provide('colorMode', colorMode)
        },
    }),
)
