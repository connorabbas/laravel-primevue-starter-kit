<script setup lang="ts">
import { useTemplateRef } from 'vue';
import TieredMenu, { type TieredMenuProps } from 'primevue/tieredmenu';
import { ChevronRight } from 'lucide-vue-next';
import type { MenuItem } from '@/types';
import { ptViewMerge } from '@/utils';

interface ExtendedTieredMenuProps extends Omit<TieredMenuProps, 'model'> {
    model: MenuItem[];
}
const componentProps = defineProps<ExtendedTieredMenuProps>();

type TieredMenuType = InstanceType<typeof TieredMenu>;
const childRef = useTemplateRef<TieredMenuType>('child-ref');

defineExpose({
    el: childRef,
});
</script>

<template>
    <TieredMenu
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
        <template #item="{ item, props, hasSubmenu }">
            <InertiaLink
                v-if="item.route"
                :href="item.route"
                class="p-tieredmenu-item-link"
                custom
            >
                <i
                    v-if="item.icon"
                    :class="item.icon"
                    class="p-tieredmenu-item-icon"
                />
                <component
                    :is="item.lucideIcon"
                    v-else-if="item.lucideIcon"
                    class="p-tieredmenu-item-icon"
                />
                <span class="p-tieredmenu-item-label">{{ item.label }}</span>
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
                    class="p-tieredmenu-item-icon"
                />
                <component
                    :is="item.lucideIcon"
                    v-else-if="item.lucideIcon"
                    class="p-tieredmenu-item-icon"
                />
                <span class="p-tieredmenu-item-label">{{ item.label }}</span>
                <ChevronRight
                    v-if="hasSubmenu"
                    class="p-tieredmenu-submenu-icon"
                />
            </a>
        </template>
    </TieredMenu>
</template>
