<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { Link as InertiaLink } from '@inertiajs/vue3'
import Menubar, { type MenubarProps } from 'primevue/menubar'
import { ChevronDown, ChevronRight } from 'lucide-vue-next'
import type { MenuItem } from '@/types'
import { ptViewMerge } from '@/utils'

interface ExtendedMenubarProps extends Omit<MenubarProps, 'model'> {
    model?: MenuItem[] | undefined;
}
const componentProps = withDefaults(
    defineProps<ExtendedMenubarProps>(),
    { breakpoint: '1024px' }
)

type MenubarType = InstanceType<typeof Menubar>;
const childRef = useTemplateRef<MenubarType>('child-ref')

defineExpose({ $el: childRef })
</script>

<template>
    <Menubar
        ref="child-ref"
        v-bind="{ ...componentProps, ptOptions: { mergeProps: ptViewMerge } }"
    >
        <template
            v-for="(_, slotName) in $slots"
            #[slotName]="slotProps"
        >
            <slot
                v-if="slotName != 'item'"
                :name="slotName"
                v-bind="slotProps ?? {}"
            />
        </template>
        <template #item="{ item, props, hasSubmenu, root }">
            <InertiaLink
                v-if="item.visible !== false && item.route"
                :href="item.route"
                :target="item.target"
                :class="['p-menubar-item-link', { 'font-bold! text-muted-color': item.active }, item.class]"
                :style="item.style"
                :aria-disabled="item.disabled === true"
                custom
            >
                <i
                    v-if="item.icon"
                    :class="['p-menubar-item-icon', item.icon]"
                />
                <component
                    :is="item.lucideIcon"
                    v-else-if="item.lucideIcon"
                    :class="['p-menubar-item-icon', item.lucideIconClass]"
                />
                <span class="p-menubar-item-label">{{ item.label }}</span>
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
                    :class="['p-menubar-item-icon', item.icon]"
                />
                <component
                    :is="item.lucideIcon"
                    v-else-if="item.lucideIcon"
                    :class="['p-menubar-item-icon', item.lucideIconClass]"
                />
                <span class="p-menubar-item-label">{{ item.label }}</span>
                <template v-if="hasSubmenu">
                    <ChevronDown
                        v-if="root"
                        class="p-menubar-submenu-icon"
                    />
                    <ChevronRight
                        v-else
                        class="p-menubar-submenu-icon"
                    />
                </template>
            </a>
        </template>
    </Menubar>
</template>
