<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { usePage } from '@inertiajs/vue3'
import { Check, CircleX, Info, TriangleAlert, Megaphone } from '@lucide/vue'
import type { FlashProps } from '@/types'
import { resolveFlashSeverity } from '@/utils'

const page = usePage()
const dismissedMessageKeys = ref<string[]>([])

const messageIconBySeverity = {
    success: Check,
    info: Info,
    warn: TriangleAlert,
    error: CircleX,
    secondary: Megaphone,
} as const

const visibleFlashMessages = computed(() => {
    const flashEntries = Object.entries(page.flash as FlashProps)

    return flashEntries
        .filter(([key, value]) => {
            return (
                key.endsWith('_message')
                && typeof value === 'string'
                && value.trim() !== ''
                && !dismissedMessageKeys.value.includes(key)
            )
        })
        .map(([key, value]) => {
            const severity = resolveFlashSeverity(key)

            return {
                key,
                message: value,
                severity,
                icon: messageIconBySeverity[severity],
            }
        })
})

const dismissMessage = (key: string): void => {
    if (!dismissedMessageKeys.value.includes(key)) {
        dismissedMessageKeys.value.push(key)
    }
}

watch(
    () => page.flash,
    () => {
        dismissedMessageKeys.value = []
    },
    { deep: true },
)
</script>

<template>
    <div class="m-0">
        <Message
            v-for="flashMessage in visibleFlashMessages"
            :key="flashMessage.key"
            class="mb-6"
            :severity="flashMessage.severity"
            closable
            @close="dismissMessage(flashMessage.key)"
        >
            <template #icon>
                <component :is="flashMessage.icon" />
            </template>
            {{ flashMessage.message }}
        </Message>
    </div>
</template>
