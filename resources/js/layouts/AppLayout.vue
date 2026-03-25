<script setup lang="ts">
import AppHead from '@/components/AppHead.vue'
import AppLayout from '@/layouts/app/HeaderLayout.vue'
import { MenuItem } from '@/types'

const props = withDefaults(defineProps<{
    title: string,
    description?: string,
    breadcrumbs?: MenuItem[],
}>(), {
    breadcrumbs: () => [],
    description: 'Manage your account, settings, and application workspace in this Laravel and PrimeVue starter kit.',
})
</script>

<template>
    <AppHead
        :title="props.title"
        :description="props.description"
    >
        <slot name="head" />
    </AppHead>

    <AppLayout :breadcrumbs="props.breadcrumbs">
        <slot />
    </AppLayout>
</template>
