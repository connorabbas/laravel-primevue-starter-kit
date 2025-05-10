<script setup>
import AppLayout from '@/layouts/AppLayout.vue';
import SettingsLayout from '@/layouts/UserSettingsLayout.vue';
import SelectColorModeButton from '@/components/SelectColorModeButton.vue';
import ThemePresetSelector from '@/components/ThemePresetSelector.vue';
</script>

<template>
    <AppLayout>
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
                    <div class="space-y-6">
                        <div class="flex flex-col gap-2">
                            <label for="color-mode-selector">Color Mode</label>
                            <SelectColorModeButton id="color-mode-selector" />
                        </div>
                        <div class="flex flex-col gap-2">
                            <label for="theme-preset-selector">Theme</label>
                            <ThemePresetSelector id="theme-preset-selector" />
                        </div>
                    </div>
                </template>
            </Card>
        </SettingsLayout>
    </AppLayout>
</template>
