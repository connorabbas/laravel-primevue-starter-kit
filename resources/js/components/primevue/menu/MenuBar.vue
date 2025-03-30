<script setup lang="ts">
import { useTemplateRef } from 'vue';
import Menubar from 'primevue/menubar';
import { ChevronDown, ChevronRight } from 'lucide-vue-next';
import type { ExtendedMenuItem } from '@/types';

const componentProps = defineProps<{
    model: ExtendedMenuItem[]
}>();

type MenubarType = InstanceType<typeof Menubar>;
const childRef = useTemplateRef<MenubarType>('child-ref');

defineExpose({
    childRef,
});
</script>

<template>
    <Menubar
        ref="child-ref"
        :model="componentProps.model"
        breakpoint="1024px"
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
                v-if="item.route"
                :href="item.route"
                class="p-menubar-item-link"
                :class="{
                    'font-bold! text-muted-color': item.active,
                }"
                custom
            >
                <i
                    v-if="item.icon"
                    :class="item.icon"
                    class="p-menubar-item-icon"
                />
                <component
                    :is="item.lucideIcon"
                    v-else-if="item.lucideIcon"
                    class="p-menubar-item-icon"
                />
                <span class="p-menubar-item-label">{{ item.label }}</span>
            </InertiaLink>
            <a
                v-else
                :href="item.url"
                :target="item.target"
                v-bind="props.action"
                class="p-menubar-item-link"
            >
                <i
                    v-if="item.icon"
                    :class="item.icon"
                    class="p-menubar-item-icon"
                />
                <component
                    :is="item.lucideIcon"
                    v-else-if="item.lucideIcon"
                    class="p-menubar-item-icon"
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
