<script setup>
import ApplicationLogo from '@/components/ApplicationLogo.vue';
</script>

<template>
    <Container>
        <div class="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
            <div>
                <InertiaLink href="/">
                    <ApplicationLogo class="w-15 h-15 fill-current text-surface-900 dark:text-surface-0" />
                </InertiaLink>
            </div>
            <div
                v-if="$slots.message"
                class="w-full sm:max-w-md mt-6 px-4 sm:px-0"
            >
                <slot name="message" />
            </div>
            <div class="w-full sm:max-w-md mt-6">
                <Card>
                    <template #content>
                        <slot />
                    </template>
                </Card>
            </div>
        </div>
    </Container>
</template>
