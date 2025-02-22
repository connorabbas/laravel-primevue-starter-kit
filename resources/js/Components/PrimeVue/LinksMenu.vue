<script setup lang="ts">
import { useTemplateRef } from 'vue';
import Menu from 'primevue/menu';

// Alternatively, you can use the default <Menu /> component using a command callback, and a manual router visit:
// https://primevue.org/menu/#command
// https://inertiajs.com/manual-visits

type MenuType = InstanceType<typeof Menu>
const childRef = useTemplateRef<MenuType>('child-ref');
defineExpose({
    childRef,
});
</script>

<template>
    <Menu ref="child-ref">
        <template #item="{ item, props }">
            <InertiaLink
                v-if="item.route"
                :href="item.route"
                class="p-menu-item-link"
                custom
            >
                <span
                    v-if="item.icon"
                    :class="item.icon"
                    class="p-menu-item-icon"
                />
                <span class="p-menu-item-label">{{ item.label }}</span>
            </InertiaLink>
            <a
                v-else
                :href="item.url"
                :target="item.target"
                v-bind="props.action"
            >
                <span
                    v-if="item.icon"
                    :class="item.icon"
                    class="p-menu-item-icon"
                />
                <span class="p-menu-item-label">{{ item.label }}</span>
            </a>
        </template>
    </Menu>
</template>
