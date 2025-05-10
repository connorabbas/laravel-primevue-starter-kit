<script setup>
import { useThemePreset } from '@/composables/useThemePreset';

const { presets, selectedPreset, setPreset } = useThemePreset();
</script>

<template>
    <Select
        v-model="selectedPreset"
        :options="presets"
        optionLabel="label"
        optionValue="value"
        @change="setPreset(selectedPreset)"
    />
</template>
