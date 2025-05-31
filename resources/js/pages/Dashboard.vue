<script setup>
import AppLayout from '@/layouts/AppLayout.vue';

const breadcrumbs = [{ label: 'Dashboard' }];
</script>

<template>
    <AppLayout :breadcrumbs>
        <InertiaHead title="Dashboard" />

        <Card>
            <template #content>
                <p class="m-0">
                    You are logged in!
                </p>
            </template>
        </Card>
    </AppLayout>
</template>
