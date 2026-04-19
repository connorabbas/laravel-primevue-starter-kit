<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue'
import SettingsLayout from '@/layouts/UserSettingsLayout.vue'
import SelectColorModeButton from '@/components/SelectColorModeButton.vue'
import { route } from '@/utils/route'

const breadcrumbs = [
    { label: 'Dashboard', route: route('dashboard') },
    { label: 'Appearance settings' },
]
</script>

<template>
    <AppLayout
        title="Appearance settings"
        :breadcrumbs
        description="Customize the interface appearance and color mode for your account."
    >
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
