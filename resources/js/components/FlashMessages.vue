<script setup lang="ts">
import { ref, watch } from 'vue'
import { usePage } from '@inertiajs/vue3'
import { Check, CircleX, Info, TriangleAlert, Megaphone } from 'lucide-vue-next'
import { FlashProps } from '@/types'

const page = usePage()
const flashed = ref(0)

const clearFlash = (type: keyof FlashProps) => {
    if (page.props.flash?.[type]) {
        page.props.flash[type] = null
    }
}

watch(() => page.props.flash, () => {
    flashed.value++
}, { deep: true })
</script>

<template>
    <div
        :key="flashed"
        class="m-0"
    >
        <Message
            v-if="page.props.flash.success"
            class="mb-6"
            severity="success"
            closable
            @close="clearFlash('success')"
        >
            <template #icon>
                <Check />
            </template>
            {{ page.props.flash.success }}
        </Message>
        <Message
            v-if="page.props.flash.info"
            class="mb-6"
            severity="info"
            closable
            @close="clearFlash('info')"
        >
            <template #icon>
                <Info />
            </template>
            {{ page.props.flash.info }}
        </Message>
        <Message
            v-if="page.props.flash.warn"
            class="mb-6"
            severity="warn"
            closable
            @close="clearFlash('warn')"
        >
            <template #icon>
                <TriangleAlert />
            </template>
            {{ page.props.flash.warn }}
        </Message>
        <Message
            v-if="page.props.flash.error"
            class="mb-6"
            severity="error"
            closable
            @close="clearFlash('error')"
        >
            <template #icon>
                <CircleX />
            </template>
            {{ page.props.flash.error }}
        </Message>
        <Message
            v-if="page.props.flash.message"
            class="mb-6"
            severity="secondary"
            closable
            @close="clearFlash('message')"
        >
            <template #icon>
                <Megaphone />
            </template>
            {{ page.props.flash.message }}
        </Message>
    </div>
</template>
