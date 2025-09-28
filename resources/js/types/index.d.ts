import type { DataTableFilterMetaData } from 'primevue'
import type { Page, Errors } from '@inertiajs/core'
import type { MenuItem as PrimeVueMenuItem } from 'primevue/menuitem'
import type { LucideIcon } from 'lucide-vue-next'
import type { Config } from 'ziggy-js'

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface AuthProps {
    user: User;
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
    ziggy: Config & { location: string };
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
