import { PageProps as InertiaPageProps } from '@inertiajs/core'
import { AxiosInstance } from 'axios'
import { route as ziggyRoute } from 'ziggy-js'
import { AppPageProps } from './'

declare global {
    interface Window {
        axios: AxiosInstance;
    }

    var route: typeof ziggyRoute
}

declare module 'vue' {
    interface ComponentCustomProperties {
        route: typeof ziggyRoute
    }
}

declare module '@inertiajs/core' {
    interface PageProps extends InertiaPageProps, AppPageProps { }
    export interface InertiaConfig {
        errorValueType: string[]
    }
}
