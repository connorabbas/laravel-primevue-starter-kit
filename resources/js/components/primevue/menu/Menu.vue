<script setup lang="ts">
import { useTemplateRef } from 'vue';
import Menu from 'primevue/menu';
import type { ExtendedMenuItem } from '@/types';

const componentProps = defineProps<{
    model: ExtendedMenuItem[]
}>();

type MenuType = InstanceType<typeof Menu>;
const childRef = useTemplateRef<MenuType>('child-ref');

defineExpose({
    childRef,
    toggle: (event: Event) => childRef.value?.toggle(event)
});
</script>

<template>
    <Menu
        ref="child-ref"
        :model="componentProps.model"
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
