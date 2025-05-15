<script setup lang="ts">
import { useTemplateRef } from 'vue';
import PanelMenu, { type PanelMenuPassThroughOptions, type PanelMenuProps } from 'primevue/panelmenu';
import { ChevronDown, ChevronRight } from 'lucide-vue-next';
import type { MenuItem } from '@/types';
import { ptViewMerge } from '@/utils';

interface ExtendedPanelMenuProps extends Omit<PanelMenuProps, 'model'> {
    model: MenuItem[];
}
const componentProps = defineProps<ExtendedPanelMenuProps>();

const defaultPt: PanelMenuPassThroughOptions = {
    root: 'p-0 m-0 gap-1',
    panel: 'p-0 bg-transparent border-0',
    header: 'p-0 border-0',
    itemContent: 'gap-1',
};

type PanelMenuType = InstanceType<typeof PanelMenu>;
const childRef = useTemplateRef<PanelMenuType>('child-ref');
defineExpose({ el: childRef });
</script>

<template>
    <PanelMenu
        ref="child-ref"
        v-bind="{ ...componentProps, pt: defaultPt, ptOptions: { mergeProps: ptViewMerge } }"
    >
        <template #item="{ item, root, active, hasSubmenu }">
            <InertiaLink
                v-if="item.route"
                :href="item.route"
                :class="[
                    'p-panelmenu-item-link flex items-center cursor-pointer no-underline px-4 py-2',
                    { 'font-bold! text-muted-color': item.active },
                ]"
                custom
            >
                <i
                    v-if="item.icon"
                    :class="[root ? 'p-panelmenu-header-icon' : 'p-panelmenu-item-icon', item.icon]"
                />
                <component
                    :is="item.lucideIcon"
                    v-else-if="item.lucideIcon"
                    :class="[root ? 'p-panelmenu-header-icon' : 'p-panelmenu-item-icon']"
                />
                <span>{{ item.label }}</span>
            </InertiaLink>
            <a
                v-else
                :href="item.url"
                :target="item.target"
                :class="[
                    'flex items-center cursor-pointer no-underline px-4 py-2',
                    hasSubmenu ? 'p-panelmenu-header-link' : 'p-panelmenu-item-link',
                ]"
            >
                <i
                    v-if="item.icon"
                    :class="[root ? 'p-panelmenu-header-icon' : 'p-panelmenu-item-icon', item.icon]"
                />
                <component
                    :is="item.lucideIcon"
                    v-else-if="item.lucideIcon"
                    :class="[root ? 'p-panelmenu-header-icon' : 'p-panelmenu-item-icon']"
                />
                <span>{{ item.label }}</span>
                <template v-if="hasSubmenu">
                    <ChevronDown
                        v-if="active"
                        class="p-panelmenu-submenu-icon ml-auto"
                    />
                    <ChevronRight
                        v-else
                        class="p-panelmenu-submenu-icon ml-auto"
                    />
                </template>
            </a>
        </template>
    </PanelMenu>
</template>