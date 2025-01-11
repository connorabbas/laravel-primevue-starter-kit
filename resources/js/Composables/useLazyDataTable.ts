import { usePaginatedData } from './usePaginatedData';
import * as PrimeVue from '@/types/primevue';

export function useLazyDataTable(
    defaultFilters: PrimeVue.PaginatedDataFilters = {},
    only: string[] = ['request'],
    initialsRows: number = 20
) {
    const {
        processing,
        filters,
        sorting,
        pagination,
        firstDatasetIndex,
        filteredOrSorted,
        debounceInputFilter,
        scrollToTop,
        fetchData,
        paginate,
        reset,
    } = usePaginatedData(defaultFilters, only, initialsRows);

    function parseEventFilterValues() {
        Object.keys(filters.value).forEach((key) => {
            const filter = filters.value[key];
            // empty arrays can cause filtering issues, set to null instead
            if (Array.isArray(filter.value) && filter.value.length === 0) {
                filters.value[key].value = null;
            }
        });
    }

    function filter(event: { filters: PrimeVue.PaginatedDataFilters }) {
        pagination.value.page = 1;
        filters.value = { ...event.filters };
        parseEventFilterValues();
        fetchData().then(() => {
            scrollToTop();
        });
    }

    function sort(event: PrimeVue.SortEvent) {
        pagination.value.page = 1;
        sorting.value.field = event.sortField;
        sorting.value.order = event.sortOrder;
        fetchData().then(() => {
            scrollToTop();
        });
    }

    return {
        processing,
        filters,
        sorting,
        pagination,
        firstDatasetIndex,
        filteredOrSorted,
        debounceInputFilter,
        fetchData,
        paginate,
        filter,
        sort,
        reset,
    };
}
