<script setup>
import AppLayout from '@/layouts/AppLayout.vue';
import SettingsLayout from '@/layouts/UserSettingsLayout.vue';
import SelectColorModeButton from '@/components/SelectColorModeButton.vue';

const breadcrumbs = [
    { label: 'Dashboard', route: route('dashboard') },
    { label: 'Appearance Settings' },
];
</script>

<template>
    <AppLayout :breadcrumbs>
        <InertiaHead title="Appearance Settings" />

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
