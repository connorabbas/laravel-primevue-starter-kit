<script setup>
import { useDark, useToggle } from '@vueuse/core';

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<template>
    <Button
        title="Toggle Light/Dark Mode"
        :icon="isDark ? 'pi pi-moon' : 'pi pi-sun'"
        @click="toggleDark()"
    />
</template>
