<script setup lang="ts">
import ApplicationLogo from '@/components/ApplicationLogo.vue'
import { Link as InertiaLink } from '@inertiajs/vue3'
</script>

<template>
    <Button
        :href="route('welcome')"
        :as="InertiaLink"
        pt:root:class="flex items-center justify-start gap-4 no-underline p-0"
        variant="link"
    >
        <ApplicationLogo class="block h-8 lg:h-10 w-auto fill-current text-surface-900 dark:text-surface-0" />
        <span class="font-bold">Laravel + PrimeVue Starter Kit</span>
    </Button>
</template>