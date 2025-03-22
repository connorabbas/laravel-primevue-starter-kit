<script setup>
import AppLayout from '@/layouts/AppLayout.vue';
import SettingsLayout from '@/layouts/UserSettingsLayout.vue';
import SelectColorModeButton from '@/components/SelectColorModeButton.vue';
</script>

<template>
    <AppLayout>
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
    </AppLayout>
</template>
