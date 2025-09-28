import { useColorMode, type BasicColorSchema, type UseColorModeOptions } from '@vueuse/core'
import { useCookies } from '@vueuse/integrations/useCookies'
import type { CookieSetOptions } from 'universal-cookie'
import { watch } from 'vue'

interface SiteColorModeOptions extends UseColorModeOptions {
    cookieKey?: string;
    cookieOpts?: CookieSetOptions;
    cookieColorMode?: BasicColorSchema;
}

export function useSiteColorMode(opts: SiteColorModeOptions = {}) {
    const {
        cookieKey = 'colorScheme',
        cookieOpts: userOpts,
        cookieColorMode,
        ...rest
    } = opts

    // a maxAge in seconds (365 days)
    const defaultOpts: CookieSetOptions = {
        path: '/',
        maxAge: 365 * 24 * 60 * 60,
        sameSite: 'lax',
    }

    const finalCookieOpts = { ...defaultOpts, ...userOpts }

    const cookies = useCookies([cookieKey])
    const initialValue: BasicColorSchema = typeof window === 'undefined'
        ? (cookieColorMode ?? 'auto')
        : (cookies.get(cookieKey) as BasicColorSchema) ?? 'auto'

    const colorMode = useColorMode({ initialValue, ...rest })

    if (typeof window !== 'undefined') {
        watch(colorMode, (mode) => {
            cookies.set(cookieKey, mode, finalCookieOpts)
        })
    }

    return colorMode
}
