<script setup>
const props = defineProps({
    spacedMobile: {
        type: Boolean,
        default: true,
        required: false,
    },
    fluid: {
        type: Boolean,
        default: false,
        required: false,
    },
});
</script>

<template>
    <div
        :class="[
            { 'col-12 md:col-10 md:col-offset-1 lg:col-8 lg:col-offset-2': !fluid },
            spacedMobile ? 'px-4' : 'px-0',
            'py-0 md:px-8',
        ]"
    >
        <slot />
    </div>
</template>
