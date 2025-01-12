import { usePaginatedData } from './usePaginatedData';
import * as PrimeVue from '@/types/primevue';

export function useLazyDataTable(
    initialFilters: PrimeVue.PaginatedDataFilters = {},
    only: string[] = ['request'],
    initialsRows: number = 20
) {
    const defaultFilters = initialFilters;
    const defaultRows = initialsRows;

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
    } = usePaginatedData(initialFilters, only, initialsRows);

    function parseEventFilterValues() {
        Object.keys(filters.value).forEach((key) => {
            const filter = filters.value[key];
            // empty arrays can cause filtering issues, set to null instead
            if (Array.isArray(filter.value) && filter.value.length === 0) {
                filters.value[key].value = null;
            }
        });
    }

    /**
     * "Override" parent composable function
     * Event driven filtering rather than reactive state
     */
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

    /**
     * "Override" parent composable function
     * usePaginatedData() resets sorting.value state as a new object, this will not work for DataTable's
     */
    function reset() {
        Object.keys(defaultFilters).forEach((key) => {
            filters.value[key].value = defaultFilters[key].value;
        });
        sorting.value.field = '';
        sorting.value.order = 1;
        pagination.value = {
            page: 1,
            rows: defaultRows,
        };
        fetchData().then(() => {
            window.history.replaceState(null, '', window.location.pathname);
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
