<script setup lang="ts">
import { useTemplateRef } from 'vue';
import PanelMenu from 'primevue/panelmenu';
import { ChevronDown, ChevronRight } from 'lucide-vue-next';
import type { ExtendedMenuItem } from '@/types';

const props = defineProps<{
    model: ExtendedMenuItem[]
}>();

type PanelMenuType = InstanceType<typeof PanelMenu>;
const childRef = useTemplateRef<PanelMenuType>('child-ref');
defineExpose({
    childRef,
});
</script>

<template>
    <PanelMenu
        ref="child-ref"
        :model="props.model"
        pt:root:class="p-0 m-0 gap-1"
        pt:panel:class="p-0 border-0"
        pt:header:class="p-0 border-0"
        pt:itemContent:class="gap-1"
    >
        <template #item="{ item, root, active }">
            <InertiaLink
                v-if="item.route"
                :href="item.route"
                :class="[
                    'p-panelmenu-item-link flex items-center cursor-pointer no-underline px-4 py-2',
                    { 'font-bold! text-muted-color': item.active }
                ]"
                custom
            >
                <i
                    v-if="item.icon"
                    :class="[
                        root ? 'p-panelmenu-header-icon' : 'p-panelmenu-item-icon',
                        item.icon,
                    ]"
                />
                <component
                    v-else-if="item.lucideIcon"
                    :is="item.lucideIcon"
                    :class="[
                        root ? 'p-panelmenu-header-icon' : 'p-panelmenu-item-icon',
                        'size-4',
                    ]"
                />
                <span>{{ item.label }}</span>
            </InertiaLink>
            <a
                v-else
                :href="item.url"
                :target="item.target"
                :class="[
                    'flex items-center cursor-pointer no-underline px-4 py-2',
                    item.items ? 'p-panelmenu-header-link' : 'p-panelmenu-item-link',
                ]"
            >
                <i
                    v-if="item.icon"
                    :class="[
                        root ? 'p-panelmenu-header-icon' : 'p-panelmenu-item-icon',
                        item.icon,
                    ]"
                />
                <component
                    v-else-if="item.lucideIcon"
                    :is="item.lucideIcon"
                    :class="[
                        root ? 'p-panelmenu-header-icon' : 'p-panelmenu-item-icon',
                        'size-4',
                    ]"
                />
                <span>{{ item.label }}</span>
                <template v-if="item.items">
                    <ChevronDown
                        v-if="active"
                        class="size-4 p-panelmenu-submenu-icon ml-auto"
                    />
                    <ChevronRight
                        v-else
                        class="size-4 p-panelmenu-submenu-icon ml-auto"
                    />
                </template>
            </a>
        </template>
    </PanelMenu>
</template>
