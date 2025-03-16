<script setup>
import { ref, watchEffect, inject } from 'vue';

const colorMode = inject('colorMode');
const selectedColorMode = ref(colorMode.value);

const options = [
    { label: 'Light', value: 'light', icon: 'pi pi-sun' },
    { label: 'Dark', value: 'dark', icon: 'pi pi-moon' },
    { label: 'System', value: 'auto', icon: 'pi pi-desktop' },
];

watchEffect(() => colorMode.value = selectedColorMode.value)
</script>

<template>
    <SelectButton
        v-model="selectedColorMode"
        :options="options"
        :allowEmpty="false"
        optionLabel="label"
        optionValue="value"
    >
        <template #option="slotProps">
            <i :class="slotProps.option.icon"></i> {{ slotProps.option.label }}
        </template>
    </SelectButton>
</template>
