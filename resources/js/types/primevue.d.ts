import type { DataTableFilterMetaData } from 'primevue'
import type { MenuItem as PrimeVueMenuItem } from 'primevue/menuitem'
import type { LucideIcon } from '@lucide/vue'

type PrimeVueUIColorSeverity = 'success' | 'info' | 'warn' | 'error' | 'secondary'

export type PrimeVueDataFilters = {
    [key: string]: DataTableFilterMetaData;
};

export interface MenuItem extends PrimeVueMenuItem {
    route?: string;
    lucideIcon?: LucideIcon;
    lucideIconClass?: string;
    active?: boolean;
}
