<script setup>
import { usePage } from '@inertiajs/vue3';

defineProps({
    laravelVersion: {
        type: String,
        required: true,
    },
    phpVersion: {
        type: String,
        required: true,
    },
});

const page = usePage();
</script>

<template>
    <InertiaHead title="Welcome" />

    <div class="min-h-full">
        <div class="h-screen flex items-center justify-center">
            <Card pt:body:class="p-4 py-6 sm:p-12">
                <template #content>
                    <div class="text-center md:text-left">
                        <span class="block text-6xl font-bold text-red-500 dark:text-red-400 mb-1">Laravel,</span>
                        <div class="text-6xl font-bold text-indigo-500 dark:text-indigo-400 mb-1">
                            Inertia.js,
                        </div>
                        <div class="text-6xl text-green-500 dark:text-green-400 text-emerald font-bold mb-4">
                            & PrimeVue
                        </div>
                        <p class="mt-0 mb-4 text-muted-color leading-normal">
                            A starter kit using
                            <a
                                href="https://laravel.com/docs/master"
                                class="underline text-primary hover:text-color"
                            >Laravel</a>,
                            <a
                                href="https://inertiajs.com/"
                                class="underline text-primary hover:text-color"
                            >Inertia.js</a>, and
                            <a
                                href="https://primevue.org/"
                                class="underline text-primary hover:text-color"
                            >PrimeVue</a>.
                        </p>
                        <template v-if="page.props.auth.user">
                            <InertiaLink :href="route('dashboard')">
                                <Button
                                    label="Dashboard"
                                    icon="pi pi-th-large"
                                    class="mr-4"
                                />
                            </InertiaLink>
                            <InertiaLink :href="route('profile.edit')">
                                <Button
                                    outlined
                                    label="Profile Settings"
                                    icon="pi pi-cog"
                                    class="mr-4"
                                />
                            </InertiaLink>
                        </template>
                        <template v-else>
                            <InertiaLink :href="route('login')">
                                <Button
                                    label="Login"
                                    icon="pi pi-sign-in"
                                    class="mr-4"
                                />
                            </InertiaLink>
                            <InertiaLink :href="route('register')">
                                <Button
                                    outlined
                                    label="Register"
                                    icon="pi pi-user-plus"
                                    class="mr-4"
                                />
                            </InertiaLink>
                        </template>
                        <div class="mt-6">
                            <p class="m-0 text-sm text-muted-color">
                                Laravel v{{ laravelVersion }} (PHP v{{
                                    phpVersion
                                }})
                            </p>
                        </div>
                    </div>
                </template>
            </Card>
        </div>
    </div>
</template>
