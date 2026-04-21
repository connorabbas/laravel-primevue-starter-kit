import type { RequestPayload, VisitOptions } from '@inertiajs/core'

export interface AuthProps {
    user: App.Data.UserData | null;
}

export type FlashProps = Record<string, unknown> & Partial<Record<`${string}_message` | `${string}_toast`, string | null>>;

export type AppPageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    colorScheme: 'auto' | 'light' | 'dark';
    currentRouteName: string | null;
    auth: AuthProps;
    queryParams: Record<string, string | string[]>;
    [key: string]: unknown;
};

export type InertiaRouterFetchCallbacks<T extends RequestPayload = RequestPayload> = Pick<VisitOptions<T>, 'onSuccess' | 'onError' | 'onFinish'>;

export type PaginatedDataVisitPayload = RequestPayload & {
    filters: any;
    page: number;
    rows: number;
    sortField: string;
    sortOrder: number;
}
