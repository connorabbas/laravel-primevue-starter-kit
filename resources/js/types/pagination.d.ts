/**
 * Interface representing a pagination link.
 */
export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

/**
 * Interface representing pagination metadata.
 */
export interface PaginationMeta {
    current_page: number;
    from: number | null;
    last_page: number;
    path: string;
    per_page: number;
    to: number | null;
    total: number;
}

/**
 * Interface representing a Laravel Illuminate\Pagination\LengthAwarePaginator
 * @template T - The type of items in the paginator.
 */
export interface LengthAwarePaginator<T> {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number | null;
    total: number;
    per_page: number;
    last_page: number;
    last_page_url: string;
    next_page_url: string | null;
    path: string;
    to: number | null;
    prev_page_url: string | null;
    links?: PaginationLink[];
    meta?: PaginationMeta;
}
