<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';

defineOptions({ layout: AuthenticatedLayout });
</script>

<template>
    <InertiaHead title="Dashboard" />

    <Container vertical>
        <Card>
            <template #content>
                <p class="m-0">You are logged in!</p>
            </template>
        </Card>
    </Container>
</template>
