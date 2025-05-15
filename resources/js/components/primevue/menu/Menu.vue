<script setup lang="ts">
import { useTemplateRef } from 'vue';
import Menu, { type MenuProps } from 'primevue/menu';
import type { MenuItem } from '@/types';
import { ptViewMerge } from '@/utils';

interface ExtendedMenuProps extends Omit<MenuProps, 'model'> {
    model: MenuItem[];
}
const componentProps = defineProps<ExtendedMenuProps>();

type MenuType = InstanceType<typeof Menu>;
const childRef = useTemplateRef<MenuType>('child-ref');

defineExpose({
    el: childRef,
    toggle: (event: Event) => childRef.value?.toggle(event)
});
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
