<script setup>
import ApplicationLogo from '@/components/ApplicationLogo.vue';
</script>

<template>
    <Container class="min-h-svh flex flex-col justify-center items-center">
        <div>
            <InertiaLink href="/">
                <ApplicationLogo class="w-12 h-12 fill-current text-surface-900 dark:text-surface-0" />
            </InertiaLink>
        </div>
        <div
            v-if="$slots.message"
            class="w-full sm:max-w-lg mt-6 px-4 sm:px-0"
        >
            <slot name="message" />
        </div>
        <div class="w-full sm:max-w-lg mt-6">
            <Card
                pt:caption:class="space-y-2"
                pt:body:class="p-6 sm:p-8 space-y-6"
            >
                <template
                    v-if="$slots.header"
                    #header
                >
                    <slot name="header" />
                </template>
                <template
                    v-if="$slots.title"
                    #title
                >
                    <slot name="title" />
                </template>
                <template
                    v-if="$slots.subtitle"
                    #subtitle
                >
                    <slot name="subtitle" />
                </template>
                <template #content>
                    <slot />
                </template>
                <template
                    v-if="$slots.footer"
                    #footer
                >
                    <slot name="footer" />
                </template>
            </Card>
        </div>
    </Container>
</template>
