import { createInertiaApp } from '@inertiajs/vue3'
import createServer from '@inertiajs/vue3/server'

import { renderToString } from '@vue/server-renderer'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { createSSRApp, DefineComponent, h } from 'vue'
import { route as ziggyRoute, ZiggyVue } from 'ziggy-js'

import PrimeVue from 'primevue/config'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'

import { useSiteColorMode } from '@/composables/useSiteColorMode'

const appName = import.meta.env.VITE_APP_NAME || 'Laravel'

createServer((page) =>
    createInertiaApp({
        page,
        render: renderToString,
        title: (title) => `${title} - ${appName}`,
        resolve: (name) => resolvePageComponent(
            `./pages/${name}.vue`,
            import.meta.glob<DefineComponent>('./pages/**/*.vue'),
        ),
        setup({ App, props, plugin }) {
            // Color mode set from cookie on the server
            const cookieColorMode = props.initialPage.props.colorScheme
            const colorMode = useSiteColorMode({
                cookieColorMode,
                emitAuto: true,
            })

            // Global Toast component
            const Root = {
                setup() {
                    return () => h('div', [
                        h(App, props),
                        h(Toast, { position: 'bottom-right' })
                    ])
                }
            }

            // Create app
            const app = createSSRApp(Root)

            // Configure Ziggy for SSR
            const ziggyConfig = {
                ...page.props.ziggy,
                location: new URL(page.props.ziggy.location),
            }
            const boundRoute: typeof ziggyRoute = ((name?: any, params?: any, absolute?: boolean) => {
                return ziggyRoute(name, params, absolute, ziggyConfig)
            }) as typeof ziggyRoute
            app.config.globalProperties.route = boundRoute
            app.config.globalProperties.$route = boundRoute
            if (typeof globalThis !== 'undefined') {
                (globalThis as any).route = boundRoute
            }

            app.use(plugin)
                .use(ZiggyVue, ziggyConfig)
                .use(PrimeVue, { theme: 'none' }) // TODO: PrimeVue won't render it's styles server side
                .use(ToastService)
                .provide('colorMode', colorMode)

            return app
        },
    }),
)
