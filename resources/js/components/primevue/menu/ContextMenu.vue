<script setup lang="ts">
import { useTemplateRef } from 'vue';
import ContextMenu, { type ContextMenuProps } from 'primevue/contextmenu';
import { ChevronRight } from 'lucide-vue-next';
import type { MenuItem } from '@/types';
import { ptViewMerge } from '@/utils';

interface ExtendedContextMenuProps extends Omit<ContextMenuProps, 'model'> {
    model: MenuItem[];
}
const componentProps = defineProps<ExtendedContextMenuProps>();

type ContextMenuType = InstanceType<typeof ContextMenu>;
const childRef = useTemplateRef<ContextMenuType>('child-ref');

defineExpose({
    el: childRef,
    toggle: (event: Event) => childRef.value?.toggle(event)
});
</script>

<template>
    <ContextMenu
        ref="child-ref"
        v-bind="{ ...componentProps, ptOptions: { mergeProps: ptViewMerge } }"
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
                    :is="item.lucideIcon"
                    v-else-if="item.lucideIcon"
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
                    :is="item.lucideIcon"
                    v-else-if="item.lucideIcon"
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
