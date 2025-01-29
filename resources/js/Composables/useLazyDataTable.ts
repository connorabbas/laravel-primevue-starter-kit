import { usePaginatedData } from './usePaginatedData';
import cloneDeep from 'lodash-es/cloneDeep';
import { DataTableFilterMetaData, DataTableFilterEvent, DataTableSortEvent } from 'primevue';
import { PrimeVueDataFilters } from '@/types';

export function useLazyDataTable(
    initialFilters: PrimeVueDataFilters = {},
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
        hardReset,
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
    function filter(event: DataTableFilterEvent) {
        pagination.value.page = 1;
        const newFilters: PrimeVueDataFilters = {};
        Object.entries(event.filters).forEach(([key, rawFilter]) => {
            if (
                rawFilter &&
                typeof rawFilter === 'object' &&
                'matchMode' in rawFilter
            ) {
                newFilters[key] = rawFilter as DataTableFilterMetaData;
            }
        });
        filters.value = newFilters;
        parseEventFilterValues();
        fetchData().then(() => {
            scrollToTop();
        });
    }

    function sort(event: DataTableSortEvent) {
        pagination.value.page = 1;
        sorting.value.field = event.sortField ? String(event.sortField) : '';
        sorting.value.order = event.sortOrder || 1;
        fetchData().then(() => {
            scrollToTop();
        });
    }

    /**
     * "Override" parent composable function
     * usePaginatedData() resets sorting.value state as a new object, this will not work for DataTable's
     */
    function reset() {
        const defaultFilters = cloneDeep(initialFilters);
        Object.keys(defaultFilters).forEach((key) => {
            filters.value[key].value = defaultFilters[key].value;
        });
        sorting.value.field = '';
        sorting.value.order = 1;
        pagination.value.page = 1;
        pagination.value.rows = initialsRows;
        fetchData();
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
        hardReset,
    };
}