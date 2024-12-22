<script setup>
import ApplicationLogo from "@/Components/ApplicationLogo.vue";
</script>

<template>
    <div
        class="min-h-screen flex flex-column gap-5 sm:justify-content-center align-items-center"
    >
        <div>
            <Link href="/">
                <ApplicationLogo
                    class="h-5rem w-auto surface-svg-fill"
                />
            </Link>
        </div>

        <div v-if="$slots.message" class="w-full sm:max-w-30rem px-4 sm:px-0">
            <slot name="message" />
        </div>

        <div class="w-full sm:max-w-30rem">
            <Card>
                <template #content>
                    <slot />
                </template>
            </Card>
        </div>
    </div>
</template>
