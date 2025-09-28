<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { Link as InertiaLink } from '@inertiajs/vue3'
import Menu, { type MenuProps } from 'primevue/menu'
import type { MenuItem } from '@/types'
import { ptViewMerge } from '@/utils'

interface ExtendedMenuProps extends Omit<MenuProps, 'model'> {
    model?: MenuItem[] | undefined;
}
const componentProps = defineProps<ExtendedMenuProps>()

type MenuType = InstanceType<typeof Menu>;
const childRef = useTemplateRef<MenuType>('child-ref')

defineExpose({
    $el: childRef,
    toggle: (event: Event) => childRef.value?.toggle(event)
})
</script>

<template>
    <Menu
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
        <template #item="{ item, props }">
            <InertiaLink
                v-if="item.visible !== false && item.route"
                :href="item.route"
                :target="item.target"
                :class="['p-menu-item-link', item.class]"
                :style="item.style"
                :aria-disabled="item.disabled === true"
                custom
            >
                <i
                    v-if="item.icon"
                    :class="['p-menu-item-icon', item.icon]"
                />
                <component
                    :is="item.lucideIcon"
                    v-else-if="item.lucideIcon"
                    :class="['p-menu-item-icon', item.lucideIconClass]"
                />
                <span class="p-menu-item-label">{{ item.label }}</span>
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
                    :class="['p-menu-item-icon', item.icon]"
                />
                <component
                    :is="item.lucideIcon"
                    v-else-if="item.lucideIcon"
                    :class="['p-menu-item-icon', item.lucideIconClass]"
                />
                <span class="p-menu-item-label">{{ item.label }}</span>
            </a>
        </template>
    </Menu>
</template>
