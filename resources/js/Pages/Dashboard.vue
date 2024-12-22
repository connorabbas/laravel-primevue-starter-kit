<script setup>
import { Head } from "@inertiajs/vue3";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import Container from "@/Components/Container.vue";
</script>

<template>
    <Head title="Dashboard" />
    <AuthenticatedLayout>
        <template #header>
            <h1 class="font-bold text-2xl leading-tight m-0">Dashboard</h1>
        </template>
        <Container>
            <div class="py-3 md:py-5">
                <Card>
                    <template #content>
                        <p class="m-0">You are logged in!</p>
                    </template>
                </Card>
            </div>
        </Container>
    </AuthenticatedLayout>
</template>
