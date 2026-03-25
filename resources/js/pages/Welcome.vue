<script setup lang="ts">
import { Link as InertiaLink, usePage } from '@inertiajs/vue3'
import {
    ArrowRight,
    ArrowUpRight,
    ChartNoAxesCombined,
    DatabaseZap,
    LayoutGrid,
    Lock,
    MessageSquareText,
    Palette,
    Rocket,
    Server,
    Settings,
    Star,
    UserPlus,
    Waypoints,
} from 'lucide-vue-next'
import AppHead from '@/components/AppHead.vue'
import Container from '@/components/Container.vue'
import SelectColorModeButton from '@/components/SelectColorModeButton.vue'

const props = defineProps<{
    laravelVersion: string,
    phpVersion: string,
}>()

const page = usePage()

const featureCards = [
    {
        title: 'Pre-configured authentication',
        description: 'Registration, login, password reset, email verification, two-factor auth, and profile management are ready from the start.',
        icon: Lock,
    },
    {
        title: 'Inertia-powered navigation',
        description: 'Move between Laravel routes with SPA smoothness while keeping the server-driven architecture that is easy to reason about.',
        icon: Waypoints,
    },
    {
        title: 'Production-ready tooling',
        description: 'TypeScript, ESLint, auto-imported PrimeVue components, Vite, and PHPStan level 8 support give a strong baseline from day one.',
        icon: Rocket,
    },
    {
        title: 'Theme presets and color mode',
        description: 'Adapt the starter to your product quickly with preset-driven theming and light, dark, and system-aware color mode support.',
        icon: Palette,
    },
    {
        title: 'Messaging and error feedback',
        description: 'Session flash messages and PrimeVue toast-based error handling are already wired in for polished, SPA-friendly user feedback.',
        icon: MessageSquareText,
    },
    {
        title: 'Server-side rendering ready',
        description: 'Ship performant first loads and a strong production baseline with SSR support included from the start.',
        icon: Server,
    },
    {
        title: 'Server-driven data workflows',
        description: 'Paginated data and data table composables make filtering, sorting, and server-driven search query flows much faster to ship.',
        icon: DatabaseZap,
    },
    {
        title: 'Built for scale',
        description: 'Modern Vue 3 architecture with Composition API, proper error handling, and security best practices built-in.',
        icon: ChartNoAxesCombined,
    },
    {
        title: 'Customizable to your needs',
        description: 'PrimeVue theme presets, header & sidebar layouts, and Laravel-first structure make it easy to evolve the starter into your own product.',
        icon: Settings,
    },
] as const
</script>

<template>
    <AppHead
        title="Welcome"
        description="A production-ready Laravel starter kit powered by Inertia and PrimeVue for building accessible, performant applications faster."
    />

    <main
        class="relative min-h-svh overflow-hidden bg-surface-50 text-surface-950 transition-colors dark:bg-surface-950 dark:text-surface-0"
    >
        <div class="pointer-events-none absolute inset-0">
            <div
                class="absolute inset-0 bg-linear-to-b from-surface-50 via-surface-0 to-surface-100 dark:from-surface-950 dark:via-surface-950 dark:to-surface-900"
            />
            <div
                class="absolute -top-20 left-1/2 h-[34rem] w-[90rem] -translate-x-1/2 rotate-[-10deg] bg-linear-to-r from-red-500/14 via-blue-500/16 to-emerald-500/14 blur-3xl dark:from-red-500/10 dark:via-blue-500/14 dark:to-emerald-500/10"
            />
            <div
                class="absolute top-20 left-1/2 h-[28rem] w-[72rem] -translate-x-1/2 rotate-[12deg] bg-linear-to-r from-transparent via-blue-400/14 to-transparent blur-3xl dark:via-blue-400/10"
            />
            <div
                class="absolute -top-10 -left-20 h-[30rem] w-[32rem] rounded-full bg-red-500/18 blur-3xl dark:bg-red-500/14"
            />
            <div
                class="absolute top-8 left-[42%] h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-blue-500/18 blur-3xl dark:bg-blue-500/16"
            />
            <div
                class="absolute -top-6 right-[-4rem] h-[28rem] w-[30rem] rounded-full bg-emerald-500/16 blur-3xl dark:bg-emerald-500/14"
            />
            <div
                class="absolute top-28 left-[28%] h-[20rem] w-[28rem] rotate-[18deg] rounded-full bg-red-300/12 blur-3xl dark:bg-red-300/6"
            />
            <div
                class="absolute top-36 right-[22%] h-[20rem] w-[28rem] rotate-[-16deg] rounded-full bg-emerald-300/12 blur-3xl dark:bg-emerald-300/6"
            />
            <div
                class="absolute bottom-28 left-[14%] h-[18rem] w-[24rem] rotate-[18deg] rounded-full bg-blue-400/12 blur-3xl dark:bg-blue-400/8"
            />
            <div
                class="absolute right-[10%] bottom-16 h-[18rem] w-[24rem] rotate-[-18deg] rounded-full bg-emerald-400/10 blur-3xl dark:bg-emerald-400/8"
            />
            <div
                class="absolute inset-x-0 top-0 h-screen bg-linear-to-b from-white/34 via-white/4 to-transparent dark:from-white/4 dark:via-transparent dark:to-transparent"
            />
            <div
                class="absolute inset-x-0 bottom-0 h-64 bg-linear-to-t from-surface-100/90 via-surface-50/60 to-transparent dark:from-surface-950 dark:via-surface-950/90 dark:to-transparent"
            />
        </div>

        <Container fluid>
            <div class="relative mx-auto flex min-h-svh max-w-7xl flex-col px-4 py-6 sm:px-6 md:px-8 lg:px-10 lg:py-8">
                <section
                    aria-labelledby="welcome-heading"
                    class="flex flex-1 items-center py-16 sm:py-20 lg:py-24"
                >
                    <div class="mx-auto flex w-full max-w-5xl flex-col items-center text-center">
                        <div class="flex gap-4">
                            <Tag
                                class="backdrop-blur-sm"
                                value="Laravel"
                                severity="danger"
                            />
                            <Tag
                                class="backdrop-blur-sm"
                                value="Inertia"
                                severity="info"
                            />
                            <Tag
                                class="backdrop-blur-sm"
                                value="PrimeVue"
                                severity="success"
                            />
                        </div>

                        <h1
                            id="welcome-heading"
                            class="mt-8 max-w-4xl text-5xl font-semibold tracking-tight text-balance text-surface-950 sm:text-6xl lg:text-7xl dark:text-white dark:text-shadow-lg"
                        >
                            Laravel + PrimeVue Starter Kit
                        </h1>

                        <p class="mt-6 max-w-3xl text-base leading-8 text-surface-600 sm:text-lg dark:text-surface-300">
                            A production-ready Laravel starter template powered by PrimeVue. Build beautiful,
                            accessible, and performant applications in minutes, not hours.
                        </p>

                        <nav
                            aria-label="Primary actions"
                            class="mt-10 flex flex-wrap items-center justify-center gap-3"
                        >
                            <Button
                                v-if="page.props.auth.user"
                                :as="InertiaLink"
                                :href="route('dashboard')"
                                label="Dashboard"
                                size="large"
                                raised
                            >
                                <template #icon>
                                    <LayoutGrid />
                                </template>
                            </Button>
                            <Button
                                v-else
                                :as="InertiaLink"
                                :href="route('register')"
                                label="Sign up"
                                size="large"
                                raised
                            >
                                <template #icon>
                                    <UserPlus />
                                </template>
                            </Button>

                            <Button
                                as="a"
                                href="https://connorabbas.github.io/laravel-primevue-starter-kit-docs/"
                                target="_blank"
                                rel="noopener"
                                label="Documentation"
                                variant="outlined"
                                severity="secondary"
                                size="large"
                                raised
                            >
                                <template #icon>
                                    <ArrowUpRight />
                                </template>
                            </Button>
                        </nav>
                    </div>
                </section>

                <section
                    aria-labelledby="feature-heading"
                    class="mx-auto w-full max-w-6xl py-6 sm:py-10 lg:py-12"
                >
                    <div class="mx-auto max-w-2xl text-center">
                        <h2
                            id="feature-heading"
                            class="text-3xl font-semibold tracking-tight text-surface-950 sm:text-4xl dark:text-white"
                        >
                            Everything you need to build modern Laravel + Vue apps
                        </h2>
                        <p class="mt-4 text-base leading-8 text-surface-600 dark:text-surface-300">
                            Start with a solid foundation. This starter kit includes all the essentials for building
                            production-ready
                            Laravel applications with PrimeVue's powerful component system.
                        </p>
                    </div>

                    <div class="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        <Card
                            v-for="feature in featureCards"
                            :key="feature.title"
                            class="group h-full border border-surface-200/80 bg-white/80 backdrop-blur-sm transition-transform duration-200 hover:-translate-y-1 hover:border-surface-300 dark:border-surface-800/80 dark:bg-surface-900/70 dark:hover:border-surface-700"
                            pt:body:class="h-full"
                            pt:content:class="flex h-full flex-col p-4"
                        >
                            <template #content>
                                <div
                                    class="flex h-14 w-14 items-center justify-center border border-surface-200 bg-surface-100 text-surface-700 [border-radius:var(--p-card-border-radius)] dark:border-surface-700 dark:bg-surface-800/80 dark:text-surface-100"
                                >
                                    <component
                                        :is="feature.icon"
                                        class="size-6!"
                                    />
                                </div>

                                <h3 class="mt-6 text-xl font-semibold text-surface-950 dark:text-white">
                                    {{ feature.title }}
                                </h3>

                                <p class="mt-4 mb-0 flex-1 text-base leading-7 text-muted-color">
                                    {{ feature.description }}
                                </p>
                            </template>
                        </Card>
                    </div>
                </section>

                <section class="mx-auto w-full max-w-6xl py-14 sm:py-16">
                    <Card
                        class="border border-surface-200/80 bg-white/80 backdrop-blur-sm dark:border-surface-800/80 dark:bg-surface-900/75"
                        pt:body:class="p-0"
                        pt:content:class="px-6 py-10 text-center sm:px-10 sm:py-12 lg:px-16 lg:py-14"
                    >
                        <template #content>
                            <p
                                class="m-0 text-sm font-medium uppercase tracking-widest text-surface-500 dark:text-surface-400"
                            >
                                Ready to build your next Laravel + Vue app?
                            </p>
                            <h2
                                class="mt-4 text-3xl font-semibold tracking-tight text-surface-950 dark:text-white sm:text-4xl"
                            >
                                Discover the power of Laravel + PrimeVue
                            </h2>
                            <p class="mx-auto mt-4 max-w-3xl text-base leading-8 text-muted-color">
                                Launch with a starter that already covers the essentials.
                            </p>

                            <div class="mt-8 flex flex-wrap items-center justify-center gap-3">
                                <Button
                                    as="a"
                                    href="https://connorabbas.github.io/laravel-primevue-starter-kit-docs/get-started/installation-guide.html"
                                    target="_blank"
                                    rel="noopener"
                                    label="Get started"
                                    size="large"
                                >
                                    <template #icon>
                                        <ArrowRight />
                                    </template>
                                </Button>

                                <Button
                                    as="a"
                                    href="https://github.com/connorabbas/laravel-primevue-starter-kit"
                                    target="_blank"
                                    rel="noopener"
                                    label="Star on GitHub"
                                    variant="outlined"
                                    severity="secondary"
                                    size="large"
                                >
                                    <template #icon>
                                        <Star />
                                    </template>
                                </Button>
                            </div>

                            <div
                                class="mt-10 flex flex-col items-center justify-between gap-4 border-t border-surface-200 pt-6 text-sm text-surface-500 dark:border-surface-800 dark:text-surface-400 sm:flex-row sm:gap-6"
                            >
                                <div class="">
                                    <span>Laravel {{ props.laravelVersion }} / PHP {{ props.phpVersion }}</span>
                                </div>
                                <SelectColorModeButton :show-label="false" />
                            </div>
                        </template>
                    </Card>
                </section>
            </div>
        </Container>
    </main>
</template>
