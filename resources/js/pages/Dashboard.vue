<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue'

const breadcrumbs = [{ label: 'Dashboard' }]
</script>

<template>
    <AppLayout
        title="Dashboard"
        description="Application dashboard."
        :breadcrumbs
    >
        <Card>
            <template #content>
                <p class="m-0">
                    You are logged in!
                </p>
            </template>
        </Card>
    </AppLayout>
</template>
