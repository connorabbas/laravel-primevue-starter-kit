<script setup lang="ts">
import { Head as InertiaHead } from '@inertiajs/vue3'
import AppLayout from '@/layouts/AppLayout.vue'

const breadcrumbs = [{ label: 'Dashboard' }]
</script>

<template>
    <InertiaHead title="Dashboard" />

    <AppLayout :breadcrumbs>        
        <Card>
            <template #content>
                <p class="m-0">
                    You are logged in!
                </p>
            </template>
        </Card>
    </AppLayout>
</template>
