<script setup lang="ts">
const props = withDefaults(defineProps<{
    fluid?: boolean,
    vertical?: boolean,
    flushMobile?: boolean,
}>(), {
    fluid: false,
    vertical: false,
    flushMobile: false,
})
</script>

<template>
    <div
        class="md:px-8"
        :class="[
            {
                'max-w-(--breakpoint-2xl) mx-auto': !props.fluid,
                'py-4 md:py-8 space-y-4 md:space-y-8': props.vertical
            },
            props.flushMobile ? 'px-0' : 'px-4',
        ]"
    >
        <slot />
    </div>
</template>