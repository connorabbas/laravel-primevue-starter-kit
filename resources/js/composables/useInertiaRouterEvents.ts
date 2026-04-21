import { router } from '@inertiajs/vue3'
import { useToast } from 'primevue/usetoast'
import type { FlashProps, PrimeVueUIColorSeverity } from '@/types'
import { resolveFlashSeverity } from '@/utils'

const toastSummaryBySeverity: Record<Exclude<PrimeVueUIColorSeverity, 'secondary'>, string> = {
    success: 'Success',
    info: 'Information',
    warn: 'Warning',
    error: 'Error',
}

/**
 * @see https://inertiajs.com/docs/v3/advanced/events
 */
export function useInertiaRouterEvents() {
    const toast = useToast()

    router.on('flash', (event) => {
        const flashEntries = Object.entries(event.detail.flash as FlashProps)

        flashEntries.forEach(([key, value]) => {
            if (!key.endsWith('_toast') || typeof value !== 'string' || value.trim() === '') {
                return
            }

            const severity = resolveFlashSeverity(key)

            toast.add({
                severity,
                summary: severity === 'secondary' ? 'Notice' : toastSummaryBySeverity[severity],
                detail: value,
                life: 5000,
            })
        })
    })

    router.on('httpException', (event) => {
        const responseBody = event.detail.response?.data as Partial<App.Data.ErrorToastResponseData> | undefined

        if (
            responseBody?.status
            && responseBody?.errorSummary
            && responseBody?.errorDetail
        ) {
            event.preventDefault()

            toast.add({
                severity: responseBody.status >= 500 ? 'error' : 'warn',
                summary: responseBody.errorSummary,
                detail: responseBody.errorDetail,
                life: 5000,
            })
        }
    })

    router.on('networkError', (event) => {
        event.preventDefault()

        toast.add({
            severity: 'error',
            summary: 'Connection Error',
            detail: 'An unexpected error occurred while loading this page. Please try again.',
            life: 5000,
        })
    })
}
