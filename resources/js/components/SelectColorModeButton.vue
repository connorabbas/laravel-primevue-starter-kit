<script setup lang="ts">
import { ref, watchEffect, inject } from 'vue'
import { Sun, Moon, Monitor } from 'lucide-vue-next'
import type { UseColorModeReturn } from '@vueuse/core'

const props = withDefaults(defineProps<{
    showLabel?: boolean,
}>(), {
    showLabel: true,
})

const colorMode = inject<UseColorModeReturn>('colorMode')!
const selectedColorMode = ref(colorMode?.value || 'auto')

const options = [
    { label: 'Light', value: 'light', icon: Sun },
    { label: 'Dark', value: 'dark', icon: Moon },
    { label: 'System', value: 'auto', icon: Monitor },
]

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
        <template #option="{ option }">
            <component :is="option.icon" /> <span v-if="props.showLabel">{{ option.label }}</span>
        </template>
    </SelectButton>
</template>
