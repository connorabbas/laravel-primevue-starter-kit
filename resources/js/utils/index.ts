import { PrimeVueUIColorSeverity } from '@/types'
import { twMerge } from 'tailwind-merge'
import { mergeProps } from 'vue'

export const ptViewMerge = (
    globalPTProps = {} as any,
    selfPTProps = {} as any,
    datasets: any
) => {
    const { class: globalClass, ...globalRest } = globalPTProps
    const { class: selfClass, ...selfRest } = selfPTProps

    return mergeProps(
        { class: twMerge(globalClass, selfClass) },
        globalRest,
        selfRest,
        datasets
    )
}

export const resolveFlashSeverity = (key: string): PrimeVueUIColorSeverity => {
    const [prefix] = key.split('_')

    if (prefix === 'success') {
        return 'success'
    }
    if (prefix === 'info') {
        return 'info'
    }
    if (prefix === 'warn' || prefix === 'warning') {
        return 'warn'
    }
    if (prefix === 'error') {
        return 'error'
    }

    return 'secondary'
}
