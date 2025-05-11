import type { DataTableFilterMetaData } from 'primevue';
import type { Page, PageProps, Errors } from '@inertiajs/core';
import type { MenuItem } from 'primevue/menuitem';
import type { LucideIcon } from 'lucide-vue-next';

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T;

export type PrimeVueDataFilters = {
    [key: string]: DataTableFilterMetaData;
};

export interface ExtendedMenuItem extends MenuItem {
    route?: string;
    lucideIcon?: LucideIcon;
}

export interface InertiaRouterFetchCallbacks {
    onSuccess?: (page: Page<PageProps>) => void;
    onError?: (errors: Errors) => void;
    onFinish?: () => void;
}
