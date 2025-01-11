import { FilterMatchModeOptions } from '@primevue/core/api';

export type MatchMode = FilterMatchModeOptions[keyof FilterMatchModeOptions];
export type PaginatedDataFilters = Record<
    string,
    { value: any; matchMode: MatchMode }
>;
export type SortEvent = {
    sortField: undefined | string;
    sortOrder: undefined | null | 0 | 1 | -1;
};

/**
 * URL params coming from Laravel App\Http\Middleware\HandleInertiaRequests request -> urlParams
 */
export interface PaginatedDataUrlParams {
    filters?: PaginatedDataFilters;
    page?: string;
    rows?: string;
    sortField?: string;
    sortOrder?: string;
}
