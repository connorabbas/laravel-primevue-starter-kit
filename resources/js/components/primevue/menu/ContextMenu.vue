<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { Link as InertiaLink } from '@inertiajs/vue3'
import ContextMenu, { type ContextMenuProps } from 'primevue/contextmenu'
import { ChevronRight } from 'lucide-vue-next'
import type { MenuItem } from '@/types'
import { ptViewMerge } from '@/utils'

interface ExtendedContextMenuProps extends Omit<ContextMenuProps, 'model'> {
    model?: MenuItem[] | undefined;
}
const componentProps = defineProps<ExtendedContextMenuProps>()

type ContextMenuType = InstanceType<typeof ContextMenu>;
const childRef = useTemplateRef<ContextMenuType>('child-ref')

defineExpose({
    $el: childRef,
    toggle: (event: Event) => childRef.value?.toggle(event)
})
</script>

<template>
    <ContextMenu
        ref="child-ref"
        v-bind="{ ...componentProps, ptOptions: { mergeProps: ptViewMerge } }"
    >
        <template #item="{ item, props, hasSubmenu }">
            <InertiaLink
                v-if="item.visible !== false && item.route"
                :href="item.route"
                :target="item.target"
                :class="['p-contextmenu-item-link', item.class]"
                :style="item.style"
                :aria-disabled="item.disabled === true"
                custom
            >
                <i
                    v-if="item.icon"
                    :class="['p-contextmenu-item-icon', item.icon]"
                />
                <component
                    :is="item.lucideIcon"
                    v-else-if="item.lucideIcon"
                    :class="['p-contextmenu-item-icon', item.lucideIconClass]"
                />
                <span class="p-contextmenu-item-label">{{ item.label }}</span>
            </InertiaLink>
            <a
                v-else-if="item.visible !== false"
                v-bind="props.action"
                :href="item.url"
                :target="item.target"
                :class="item.class"
                :style="item.style"
                :aria-disabled="item.disabled === true"
            >
                <i
                    v-if="item.icon"
                    :class="['p-contextmenu-item-icon', item.icon]"
                />
                <component
                    :is="item.lucideIcon"
                    v-else-if="item.lucideIcon"
                    :class="['p-contextmenu-item-icon', item.lucideIconClass]"
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
