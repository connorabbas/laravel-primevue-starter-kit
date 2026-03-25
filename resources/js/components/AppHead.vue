<script setup lang="ts">
import { Head as InertiaHead } from '@inertiajs/vue3'

const props = defineProps<{
    title: string,
    description: string,
}>()
</script>

<template>
    <InertiaHead :title="props.title">
        <meta
            head-key="og:title"
            property="og:title"
            :content="props.title"
        >
        <meta
            head-key="description"
            name="description"
            :content="props.description"
        >
        <meta
            head-key="og:description"
            property="og:description"
            :content="props.description"
        >
        <slot />
    </InertiaHead>
</template>
