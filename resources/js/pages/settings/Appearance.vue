<script setup lang="ts">
import { Head as InertiaHead } from '@inertiajs/vue3'
import AppLayout from '@/layouts/AppLayout.vue'
import SettingsLayout from '@/layouts/UserSettingsLayout.vue'
import SelectColorModeButton from '@/components/SelectColorModeButton.vue'

const breadcrumbs = [
    { label: 'Dashboard', route: route('dashboard') },
    { label: 'Appearance settings' },
]
</script>

<template>
    <InertiaHead title="Appearance settings" />

    <AppLayout :breadcrumbs>
        <SettingsLayout>
            <Card
                pt:body:class="max-w-2xl space-y-3"
                pt:caption:class="space-y-1"
            >
                <template #title>
                    Appearance settings
                </template>
                <template #subtitle>
                    Update your account's appearance settings
                </template>
                <template #content>
                    <SelectColorModeButton id="color-mode-selector" />
                </template>
            </Card>
        </SettingsLayout>
    </AppLayout>
</template>
