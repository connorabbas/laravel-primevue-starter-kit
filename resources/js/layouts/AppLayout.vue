<script setup lang="ts">
import AppLayout from '@/layouts/app/HeaderLayout.vue'
import { MenuItem } from '@/types'

const props = withDefaults(defineProps<{
    breadcrumbs?: MenuItem[],
}>(), {
    breadcrumbs: () => [],
})
</script>

<template>
    <AppLayout :breadcrumbs="props.breadcrumbs">
        <slot />
    </AppLayout>
</template>
