<script setup>
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue';
import SettingsLayout from '@/layouts/UserSettingsLayout.vue';
import SelectColorModeButton from '@/components/SelectColorModeButton.vue';

defineOptions({ layout: AuthenticatedLayout });
</script>

<template>
    <InertiaHead title="Appearance Settings" />

    <SettingsLayout>
        <Card
            pt:body:class="max-w-2xl space-y-3"
            pt:caption:class="space-y-1"
        >
            <template #title>Appearance settings</template>
            <template #subtitle>
                Update your account's appearance settings
            </template>
            <template #content>
                <SelectColorModeButton />
            </template>
        </Card>
    </SettingsLayout>
</template>
