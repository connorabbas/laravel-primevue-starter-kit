<script setup lang="ts">
import { useTemplateRef } from 'vue';
import TieredMenu from 'primevue/tieredmenu';
import { ChevronRight } from 'lucide-vue-next';
import type { ExtendedMenuItem } from '@/types';

const componentProps = defineProps<{
    model: ExtendedMenuItem[]
}>();

type TieredMenuType = InstanceType<typeof TieredMenu>
const childRef = useTemplateRef<TieredMenuType>('child-ref');
defineExpose({
    childRef,
});
</script>

<template>
    <TieredMenu
        ref="child-ref"
        :model="componentProps.model"
    >
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
