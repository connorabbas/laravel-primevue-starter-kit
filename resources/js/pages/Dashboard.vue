<script setup>
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue';
</script>

<template>
    <AuthenticatedLayout>
        <InertiaHead title="Dashboard" />

        <Container vertical>
            <Card>
                <template #content>
                    <p class="m-0">You are logged in!</p>
                </template>
            </Card>
        </Container>
    </AuthenticatedLayout>
</template>
