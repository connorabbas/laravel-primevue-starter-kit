<script setup lang="ts">
import { useTemplateRef } from 'vue';
import ContextMenu from 'primevue/contextmenu';
import { ChevronRight } from 'lucide-vue-next';
import type { ExtendedMenuItem } from '@/types';

const props = defineProps<{
    model: ExtendedMenuItem[]
}>();

type ContextMenuType = InstanceType<typeof ContextMenu>
const childRef = useTemplateRef<ContextMenuType>('child-ref');
defineExpose({
    childRef,
});
</script>

<template>
    <ContextMenu
        ref="child-ref"
        :model="props.model"
    >
        <template #item="{ item, props, hasSubmenu }">
            <InertiaLink
                v-if="item.route"
                :href="item.route"
                class="p-contextmenu-item-link"
                custom
            >
                <i
                    v-if="item.icon"
                    :class="item.icon"
                    class="p-contextmenu-item-icon"
                />
                <component
                    v-else-if="item.lucideIcon"
                    :is="item.lucideIcon"
                    class="p-contextmenu-item-icon"
                />
                <span class="p-contextmenu-item-label">{{ item.label }}</span>
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
                    class="p-contextmenu-item-icon"
                />
                <component
                    v-else-if="item.lucideIcon"
                    :is="item.lucideIcon"
                    class="p-contextmenu-item-icon"
                />
                <span class="p-contextmenu-item-label">{{ item.label }}</span>
                <ChevronRight
                    v-if="hasSubmenu"
                    class="p-contextmenu-submenu-icon"
                />
            </a>
        </template>
    </ContextMenu>
</template>
