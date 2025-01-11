<script setup>
import { inject } from 'vue';
import { useToggle } from '@vueuse/core';

let isDarkMode = false;
if (import.meta.env.SSR === false) {
    isDarkMode = inject('darkMode');
}
const toggleDark = useToggle(isDarkMode);
</script>

<template>
    <Button
        title="Toggle Light/Dark Mode"
        :icon="isDarkMode ? 'pi pi-moon' : 'pi pi-sun'"
        @click="toggleDark()"
    />
</template>
