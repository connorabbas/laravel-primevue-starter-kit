import { ref, computed, onMounted, toRaw } from 'vue'
import { router, usePage } from '@inertiajs/vue3'
import type { Page, PageProps } from '@inertiajs/core'
import { FilterMatchMode } from '@primevue/core/api'
import { PageState, DataTablePageEvent } from 'primevue'
import debounce from 'lodash-es/debounce'
import type { AppPageProps, PrimeVueDataFilters, InertiaRouterFetchCallbacks, PaginatedDataVisitPayload } from '@/types'

interface QueryParams {
    filters?: PrimeVueDataFilters;
    page?: string;
    rows?: string;
    sortField?: string;
    sortOrder?: string;
    [key: string]: any;
}
interface PaginationState {
    page: number;
    rows: number;
}
interface SortState {
    field: string;
    order: number;
}
type InertiaPageProps = PageProps & Omit<AppPageProps, 'queryParams'> & {
    queryParams: QueryParams
}

function formatDateForQuery(date: Date): string {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')

    return `${year}-${month}-${day}`
}

function normalizeFilterValueForQuery(value: unknown): unknown {
    if (value instanceof Date) {
        return formatDateForQuery(value)
    }

    if (Array.isArray(value)) {
        return value.map((item) => normalizeFilterValueForQuery(item))
    }

    return value
}

function normalizeFiltersForQuery(filters: PrimeVueDataFilters): PrimeVueDataFilters {
    return Object.fromEntries(
        Object.entries(filters).map(([key, filter]) => [
            key,
            {
                ...filter,
                value: normalizeFilterValueForQuery(filter.value),
            },
        ])
    )
}

function parseDateFromQuery(value: unknown): Date | null {
    if (value instanceof Date) {
        return value
    }

    if (typeof value !== 'string' || value === '') {
        return null
    }

    const dateOnlyMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)
    if (dateOnlyMatch) {
        const year = Number(dateOnlyMatch[1])
        const month = Number(dateOnlyMatch[2])
        const day = Number(dateOnlyMatch[3])

        return new Date(year, month - 1, day)
    }

    const parsed = new Date(value)

    return Number.isNaN(parsed.getTime()) ? null : parsed
}

export function usePaginatedData(
    propDataToFetch: string | string[],
    initialFilters: PrimeVueDataFilters = {},
    initialRows: number = 20
) {
    const page = usePage<InertiaPageProps>()
    const processing = ref<boolean>(false)
    const filters = ref<PrimeVueDataFilters>(structuredClone(toRaw(initialFilters)))
    const sorting = ref<SortState>({
        field: '',
        order: 1,
    })
    const pagination = ref<PaginationState>({
        page: 1,
        rows: initialRows,
    })

    const firstDatasetIndex = computed(() => {
        return (pagination.value.page - 1) * pagination.value.rows
    })

    const filteredOrSorted = computed(() => {
        const paramsFilters = page.props.queryParams?.filters || {}
        const sortField = page.props.queryParams?.sortField || null
        const isFiltering = Object.values(paramsFilters).some(
            (filter) => filter.value !== null && filter.value !== ''
        )
        const isSorting = sortField !== null && sortField !== ''

        return isFiltering || isSorting
    })

    const debounceInputFilter = debounce((filterCallback: () => void) => {
        filterCallback()
    }, 300)

    function scrollToTop(): void {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    function fetchData(options: InertiaRouterFetchCallbacks<PaginatedDataVisitPayload> = {}): Promise<Page<PageProps>> {
        const { onSuccess, onError, onFinish } = options

        return new Promise((resolve, reject) => {
            processing.value = true
            router.visit<PaginatedDataVisitPayload>(window.location.pathname, {
                method: 'get',
                data: {
                    filters: normalizeFiltersForQuery(filters.value) as any,
                    ...pagination.value,
                    sortField: sorting.value.field,
                    sortOrder: sorting.value.order,
                },
                preserveState: true,
                preserveUrl: false,
                showProgress: true,
                replace: true,
                only: Array.isArray(propDataToFetch)
                    ? [...propDataToFetch, 'queryParams']
                    : [propDataToFetch, 'queryParams'],
                onSuccess: (page) => {
                    onSuccess?.(page)
                    resolve(page)
                },
                onError: (errors) => {
                    onError?.(errors)
                    reject(errors)
                },
                onFinish: (visit) => {
                    processing.value = false
                    onFinish?.(visit)
                },
            })
        })
    }

    function paginate(event: PageState | DataTablePageEvent): Promise<Page<PageProps>> {
        if (event.rows !== pagination.value.rows) {
            pagination.value.page = 1
        } else {
            pagination.value.page = event.page + 1
        }
        pagination.value.rows = event.rows

        return fetchData({
            onFinish: () => {
                scrollToTop()
            },
        })
    }

    function filter(options: InertiaRouterFetchCallbacks<PaginatedDataVisitPayload> = {}): Promise<Page<PageProps>> {
        const { onFinish: onFinishCallback, onSuccess, onError } = options
        pagination.value.page = 1

        return fetchData({
            onSuccess,
            onError,
            onFinish: (visit) => {
                scrollToTop()
                onFinishCallback?.(visit)
            },
        })
    }

    function reset(options: InertiaRouterFetchCallbacks<PaginatedDataVisitPayload> = {}): Promise<Page<PageProps>> {
        const defaultFilters = structuredClone(toRaw(initialFilters))
        Object.keys(defaultFilters).forEach((key) => {
            filters.value[key].value = defaultFilters[key].value
        })
        sorting.value = { field: '', order: 1 }
        pagination.value = { page: 1, rows: initialRows }

        return fetchData(options)
    }

    function hardReset(options: InertiaRouterFetchCallbacks = {}): Promise<Page<PageProps>> {
        const { onSuccess, onError, onFinish } = options

        return new Promise((resolve, reject) => {
            processing.value = true
            router.visit(window.location.pathname, {
                method: 'get',
                preserveUrl: false,
                showProgress: true,
                replace: true,
                only: Array.isArray(propDataToFetch)
                    ? [...propDataToFetch, 'queryParams']
                    : [propDataToFetch, 'queryParams'],
                onSuccess: (page) => {
                    onSuccess?.(page)
                    resolve(page)
                },
                onError: (errors) => {
                    onError?.(errors)
                    reject(errors)
                },
                onFinish: (visit) => {
                    processing.value = false
                    onFinish?.(visit)
                },
            })
        })
    }

    function parseUrlFilterValues(): void {
        Object.keys(filters.value).forEach((key) => {
            const filter = filters.value[key]
            if (!filter?.value || !filter?.matchMode) {
                return
            }
            if ([
                FilterMatchMode.DATE_IS,
                FilterMatchMode.DATE_IS_NOT,
                FilterMatchMode.DATE_BEFORE,
                FilterMatchMode.DATE_AFTER,
            ].includes(filter.matchMode)) {
                const parsedDate = parseDateFromQuery(filter.value)

                if (parsedDate) {
                    filters.value[key].value = parsedDate
                }
            } else if (filter.matchMode === FilterMatchMode.BETWEEN) {
                filter.value.forEach((value: any, index: number) => {
                    const parsedDate = parseDateFromQuery(value)

                    if (parsedDate) {
                        filter.value[index] = parsedDate
                    }
                })
            } else if (
                typeof filter.value === 'string' &&
                filter.value !== '' &&
                !isNaN(Number(filter.value))
            ) {
                filters.value[key].value = Number(filter.value)
            } else if (
                Array.isArray(filter.value) ||
                filter.matchMode === FilterMatchMode.IN
            ) {
                if (filter.value.length === 0) {
                    // empty arrays cause filtering issues, set to null instead
                    filters.value[key].value = null
                } else {
                    // Unique array values
                    const unique = [...new Set(filter.value)]
                    filter.value = unique
                    filter.value.forEach((value: any, index: number) => {
                        if (typeof value === 'string' && !isNaN(Number(value))) {
                            filter.value[index] = Number(value)
                        }
                    })
                }
            }
        })
    }

    function parseUrlParams(): void {
        const queryParams = page.props.queryParams || {}
        filters.value = {
            ...structuredClone(toRaw(initialFilters)),
            ...queryParams.filters,
        }
        parseUrlFilterValues()
        if (queryParams.sortField) {
            sorting.value.field = queryParams.sortField
        }
        if (queryParams.sortOrder) {
            sorting.value.order = parseInt(queryParams.sortOrder)
        }
        if (queryParams.page) {
            pagination.value.page = parseInt(queryParams.page)
        }
        if (queryParams.rows) {
            pagination.value.rows = parseInt(queryParams.rows)
        }
    }

    onMounted(() => {
        parseUrlParams()
    })

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
    }
}
