import type { DataTableFilterMetaData } from 'primevue'
import type { Page, Errors } from '@inertiajs/core'
import type { MenuItem as PrimeVueMenuItem } from 'primevue/menuitem'
import type { LucideIcon } from '@lucide/vue'

export interface AuthProps {
    user: App.Data.UserData | null;
}

export interface FlashProps {
    success?: string | null;
    info?: string | null;
    warn?: string | null;
    error?: string | null;
    message?: string | null;
}

export type AppPageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    colorScheme: 'auto' | 'light' | 'dark';
    currentRouteName: string | null;
    auth: AuthProps;
    flash: FlashProps;
    queryParams: Record<string, string | string[]>;
};

export type PrimeVueDataFilters = {
    [key: string]: DataTableFilterMetaData;
};

export interface MenuItem extends PrimeVueMenuItem {
    route?: string;
    lucideIcon?: LucideIcon;
    lucideIconClass?: string;
    active?: boolean;
}

export interface InertiaRouterFetchCallbacks {
    onSuccess?: (page: Page<PageProps>) => void;
    onError?: (errors: Errors) => void;
    onFinish?: () => void;
}
