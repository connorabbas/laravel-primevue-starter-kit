import { ref, computed, onMounted } from 'vue';
import { router } from '@inertiajs/vue3';
import type { Page, PageProps } from '@inertiajs/core';
import { FilterMatchMode } from '@primevue/core/api';
import { PageState, DataTablePageEvent } from 'primevue';
import debounce from 'lodash-es/debounce';
import qs from 'qs';
import type { PrimeVueDataFilters, InertiaRouterFetchCallbacks } from '@/types';

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
    propDataToFetch: string | string[],
    initialFilters: PrimeVueDataFilters = {},
    initialRows: number = 20
) {
    const urlParams = ref<PaginatedFilteredSortedQueryParams>({});
    const processing = ref<boolean>(false);
    const filters = ref<PrimeVueDataFilters>(structuredClone(initialFilters));
    const sorting = ref<SortState>({
        field: '',
        order: 1,
    });
    const pagination = ref<PaginationState>({
        page: 1,
        rows: initialRows,
    });

    const firstDatasetIndex = computed(() => {
        return (pagination.value.page - 1) * pagination.value.rows;
    });
    const filteredOrSorted = computed(() => {
        const paramsFilters = urlParams.value?.filters || {};
        const sortField = urlParams.value?.sortField || null;
        const isFiltering = Object.values(paramsFilters).some(
            (filter) => filter.value !== null && filter.value !== ''
        );
        const isSorting = sortField !== null && sortField !== '';

        return isFiltering || isSorting;
    });

    const debounceInputFilter = debounce((filterCallback: () => void) => {
        filterCallback();
    }, 300);

    function setUrlParams(): void {
        const queryString = window.location.search;
        const params = qs.parse(queryString, {
            ignoreQueryPrefix: true,
            strictNullHandling: true,
            decoder: function (str, defaultDecoder) {
                // set empty string values to null to match Laravel backend behavior
                const value = defaultDecoder(str);
                return value === '' ? null : value;
            },
        }) as PaginatedFilteredSortedQueryParams;

        urlParams.value = { ...params };
    }

    function scrollToTop(): void {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

    function fetchData(options: InertiaRouterFetchCallbacks = {}): Promise<Page<PageProps>> {
        const { onSuccess, onError, onFinish } = options;

        return new Promise((resolve, reject) => {
            processing.value = true;

            router.visit(window.location.pathname, {
                method: 'get',
                data: {
                    filters: filters.value as any,
                    ...pagination.value,
                    sortField: sorting.value.field,
                    sortOrder: sorting.value.order,
                },
                preserveState: true,
                preserveUrl: false,
                showProgress: true,
                replace: true,
                only: Array.isArray(propDataToFetch) ? propDataToFetch : [propDataToFetch],
                onSuccess: (page) => {
                    onSuccess?.(page);
                    resolve(page);
                },
                onError: (errors) => {
                    onError?.(errors);
                    reject(errors);
                },
                onFinish: () => {
                    setUrlParams();
                    processing.value = false;
                    onFinish?.();
                },
            });
        });
    }

    function paginate(event: PageState | DataTablePageEvent): Promise<Page<PageProps>> {
        if (event.rows !== pagination.value.rows) {
            pagination.value.page = 1;
        } else {
            pagination.value.page = event.page + 1;
        }

        pagination.value.rows = event.rows;

        return fetchData({
            onFinish: () => {
                scrollToTop();
            },
        });
    }

    function filter(options: InertiaRouterFetchCallbacks = {}): Promise<Page<PageProps>> {
        const { onFinish: onFinishCallback, onSuccess, onError } = options;

        pagination.value.page = 1;
        return fetchData({
            onSuccess,
            onError,
            onFinish: () => {
                scrollToTop();
                onFinishCallback?.();
            },
        });
    }

    function reset(options: InertiaRouterFetchCallbacks = {}): Promise<Page<PageProps>> {
        const defaultFilters = structuredClone(initialFilters);
        Object.keys(defaultFilters).forEach((key) => {
            filters.value[key].value = defaultFilters[key].value;
        });
        sorting.value = { field: '', order: 1 };
        pagination.value = { page: 1, rows: initialRows };

        return fetchData(options);
    }

    function hardReset(options: InertiaRouterFetchCallbacks = {}): Promise<Page<PageProps>> {
        const { onSuccess, onError, onFinish } = options;

        return new Promise((resolve, reject) => {
            processing.value = true;

            router.visit(window.location.pathname, {
                method: 'get',
                preserveUrl: false,
                showProgress: true,
                replace: true,
                only: Array.isArray(propDataToFetch) ? propDataToFetch : [propDataToFetch],
                onSuccess(page) {
                    onSuccess?.(page);
                    resolve(page);
                },
                onError(errors) {
                    onError?.(errors);
                    reject(errors);
                },
                onFinish() {
                    processing.value = false;
                    onFinish?.();
                },
            });
        });
    }

    function parseUrlFilterValues(): void {
        Object.keys(filters.value).forEach((key) => {
            const filter = filters.value[key];

            if (!filter?.value || !filter?.matchMode) {
                return;
            }

            if (
                filter.matchMode == FilterMatchMode.DATE_IS ||
                filter.matchMode == FilterMatchMode.DATE_IS_NOT ||
                filter.matchMode == FilterMatchMode.DATE_BEFORE ||
                filter.matchMode == FilterMatchMode.DATE_AFTER
            ) {
                filters.value[key].value = new Date(filter.value as string);
            } else if (filter.matchMode == FilterMatchMode.BETWEEN) {
                filter.value.forEach((value: any, index: number) => {
                    if (typeof value === 'string') {
                        filter.value[index] = new Date(value);
                    }
                });
            } else if (
                typeof filter.value === 'string' &&
                filter.value !== '' &&
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
                        if (typeof value === 'string' && !isNaN(Number(value))) {
                            filter.value[index] = Number(value);
                        }
                    });
                }
            }
        });
    }

    function parseUrlParams(urlParamsObj: PaginatedFilteredSortedQueryParams): void {
        filters.value = {
            ...structuredClone(initialFilters),
            ...urlParamsObj?.filters,
        };

        parseUrlFilterValues();

        if (urlParamsObj?.sortField) {
            sorting.value.field = urlParamsObj.sortField;
        }

        if (urlParamsObj?.sortOrder) {
            sorting.value.order = parseInt(urlParamsObj.sortOrder);
        }

        if (urlParamsObj?.page) {
            pagination.value.page = parseInt(urlParamsObj.page);
        }

        if (urlParamsObj?.rows) {
            pagination.value.rows = parseInt(urlParamsObj.rows);
        }
    }

    onMounted(() => {
        setUrlParams();
        parseUrlParams(urlParams.value);
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
        hardReset,
        parseUrlParams,
    };
}
