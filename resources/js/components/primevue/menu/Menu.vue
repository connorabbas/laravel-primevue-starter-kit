<script setup lang="ts">
import { useTemplateRef } from 'vue';
import Menu from 'primevue/menu';
import type { ExtendedMenuItem } from '@/types';

const componentProps = defineProps<{
    model: ExtendedMenuItem[]
}>();

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
    <Menu
        ref="child-ref"
        :model="componentProps.model"
    >
        <template #item="{ item, props }">
            <InertiaLink
                v-if="item.route"
                :href="item.route"
                class="p-menu-item-link"
                custom
            >
                <i
                    v-if="item.icon"
                    :class="item.icon"
                    class="p-menu-item-icon"
                />
                <component
                    :is="item.lucideIcon"
                    v-else-if="item.lucideIcon"
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
                <i
                    v-if="item.icon"
                    :class="item.icon"
                    class="p-menu-item-icon"
                />
                <component
                    :is="item.lucideIcon"
                    v-else-if="item.lucideIcon"
                    class="p-menu-item-icon"
                />
                <span class="p-menu-item-label">{{ item.label }}</span>
            </a>
        </template>
    </Menu>
</template>
