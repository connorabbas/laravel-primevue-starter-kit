<script setup>
import ApplicationLogo from "@/Components/ApplicationLogo.vue";
</script>

<template>
    <div
        class="min-h-screen flex flex-column gap-4 sm:justify-content-center align-items-center"
    >
        <div>
            <Link href="/">
                <ApplicationLogo class="h-5rem w-auto surface-svg-fill" />
            </Link>
        </div>

        <div v-if="$slots.message" class="w-full sm:max-w-30rem">
            <slot name="message" />
        </div>

        <div class="w-full sm:max-w-30rem">
            <Card
                :pt="{
                    content: {
                        class: 'p-0',
                    },
                }"
            >
                <template #content>
                    <slot />
                </template>
            </Card>
        </div>
    </div>
</template>
