<script setup>
import { useTemplateRef } from "vue";

// Alternatively, you can use the default <Menu /> component using a command callback, and a manual router visit:
// https://primevue.org/menu/#command
// https://inertiajs.com/manual-visits

const childRef = useTemplateRef("child-ref");
defineExpose({
    childRef,
});
</script>

<template>
    <Menu ref="child-ref">
        <template #item="{ item, props }">
            <Link
                v-if="item.route"
                :href="item.route"
                class="p-menuitem-link"
                custom
            >
                <span
                    v-show="item.icon"
                    :class="[item.icon, 'mr-2']"
                    class="text-color-secondary"
                />
                <span>{{ item.label }}</span>
            </Link>
            <a
                v-else
                :href="item.url"
                :target="item.target"
                v-bind="props.action"
            >
                <span
                    v-show="item.icon"
                    :class="[item.icon, 'mr-2']"
                    class="text-color-secondary"
                />
                <span>{{ item.label }}</span>
            </a>
        </template>
    </Menu>
</template>
