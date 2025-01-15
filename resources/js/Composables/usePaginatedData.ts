import { ref, computed, onMounted } from 'vue';
import { router, usePage } from '@inertiajs/vue3';
import { FilterMatchMode } from '@primevue/core/api';
import debounce from 'lodash-es/debounce';
import cloneDeep from 'lodash-es/cloneDeep';
import { PageState, DataTablePageEvent } from 'primevue';
import { PrimeVueDataFilters } from '@/types';

interface PaginatedFilteredSortedQueryParams {
    filters?: PrimeVueDataFilters;
    page?: string;
    rows?: string;
    sortField?: string;
    sortOrder?: string;
}
interface PaginationState {
    page: number;
    rows: number;
}
interface SortState {
    field: string;
    order: number;
}

export function usePaginatedData(
    initialFilters: PrimeVueDataFilters = {},
    only: string[] = ['request'],
    initialsRows: number = 20
) {
    const page = usePage<{
        request: {
            urlParams: PaginatedFilteredSortedQueryParams;
        };
    }>();

    const processing = ref<boolean>(false);
    const filters = ref<PrimeVueDataFilters>(cloneDeep(initialFilters));
    const sorting = ref<SortState>({
        field: '',
        order: 1,
    });
    const pagination = ref<PaginationState>({
        page: 1,
        rows: initialsRows,
    });

    const firstDatasetIndex = computed(() => {
        return (pagination.value.page - 1) * pagination.value.rows;
    });
    const filteredOrSorted = computed(() => {
        const filters = page.props?.request?.urlParams?.filters || {};
        const sortField = page.props?.request?.urlParams?.sortField || null;
        const isFiltering = Object.values(filters).some(
            (filter) => filter.value !== null && filter.value !== ''
        );
        const isSorting = sortField !== null && sortField !== '';

        return isFiltering || isSorting;
    });

    const debounceInputFilter = debounce((filterCallback: () => void) => {
        filterCallback();
    }, 300);

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

    function fetchData() {
        window.history.replaceState(null, '', window.location.pathname);
        return new Promise((resolve, reject) => {
            processing.value = true;
            router.reload({
                only: ['request', ...new Set(only)],
                data: {
                    filters: filters.value as any,
                    ...pagination.value,
                    sortField: sorting.value.field,
                    sortOrder: sorting.value.order,
                },
                showProgress: true,
                onSuccess: (page) => {
                    resolve(page);
                },
                onError: (errors) => {
                    reject(errors);
                },
                onFinish: () => {
                    processing.value = false;
                },
            });
        });
    }

    function paginate(event: PageState | DataTablePageEvent) {
        pagination.value.page = event.page + 1;
        pagination.value.rows = event.rows;
        fetchData().then(() => {
            scrollToTop();
        });
    }

    function filter() {
        pagination.value.page = 1;
        fetchData().then(() => {
            scrollToTop();
        });
    }

    function reset() {
        // Alternatively just use: router.get(window.location.pathname);
        // Caveat to the above approach, we would lose state from our page not related to pagination/filtering/sorting

        const defaultFilters = cloneDeep(initialFilters);
        Object.keys(defaultFilters).forEach((key) => {
            filters.value[key].value = defaultFilters[key].value;
            filters.value[key].matchMode = defaultFilters[key].matchMode;
        });
        sorting.value = {
            field: '',
            order: 1,
        };
        pagination.value = {
            page: 1,
            rows: initialsRows,
        };
        fetchData().then(() => {
            window.history.replaceState(null, '', window.location.pathname);
        });
    }

    function parseUrlFilterValues() {
        Object.keys(filters.value).forEach((key) => {
            const filter = filters.value[key];
            if (!filter?.value || !filter?.matchMode) {
                return;
            }
            if (filter.matchMode == FilterMatchMode.DATE_IS) {
                filters.value[key].value = new Date(filter.value);
            } else if (
                typeof filter.value === 'string' &&
                !isNaN(Number(filter.value))
            ) {
                filters.value[key].value = Number(filter.value);
            } else if (
                Array.isArray(filter.value) ||
                filter.matchMode == FilterMatchMode.IN
            ) {
                if (filter.value.length === 0) {
                    // empty arrays cause filtering issues, set to null instead
                    filters.value[key].value = null;
                } else {
                    // Unique array values
                    const unique = [...new Set(filter.value)];
                    filter.value = unique;
                    filter.value.forEach((value: any, index: number) => {
                        if (
                            typeof value === 'string' &&
                            !isNaN(Number(value))
                        ) {
                            filter.value[index] = Number(value);
                        }
                    });
                }
            }
        });
    }

    function parseUrlParams(urlParams: PaginatedFilteredSortedQueryParams) {
        filters.value = {
            ...cloneDeep(initialFilters),
            ...urlParams?.filters,
        };
        parseUrlFilterValues();
        if (urlParams?.sortField) {
            sorting.value.field = urlParams.sortField;
        }
        if (urlParams?.sortOrder) {
            sorting.value.order = parseInt(urlParams.sortOrder);
        }
        if (urlParams?.page) {
            pagination.value.page = parseInt(urlParams.page);
        }
    }

    onMounted(() => {
        parseUrlParams(page.props.request.urlParams);
    });

    return {
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
        filter,
        reset,
        parseUrlParams,
    };
}
