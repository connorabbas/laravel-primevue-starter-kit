<script setup lang="ts">
import { useTemplateRef } from 'vue';
import Menubar from 'primevue/menubar';

type MenubarType = InstanceType<typeof Menubar>;
const childRef = useTemplateRef<MenubarType>('child-ref');
defineExpose({
    childRef,
});
</script>

<template>
    <Menubar
        ref="child-ref"
        breakpoint="1024px"
    >
        <template
            v-if="$slots.start"
            #start
        >
            <slot name="start"></slot>
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
                <span
                    v-if="item.icon"
                    :class="item.icon"
                    class="p-menubar-item-icon"
                />
                <span class="p-menu-item-label">{{ item.label }}</span>
            </InertiaLink>
            <a
                v-else
                :href="item.url"
                :target="item.target"
                v-bind="props.action"
                class="p-menubar-item-link"
            >
                <span
                    v-if="item.icon"
                    :class="item.icon"
                    class="p-menubar-item-icon"
                />
                <span class="p-menu-item-label">{{ item.label }}</span>
                <i
                    v-if="hasSubmenu"
                    :class="[
                        'pi',
                        root ? 'pi-angle-down text-xs' : 'pi-angle-right',
                    ]"
                ></i>
            </a>
        </template>
        <template
            v-if="$slots.end"
            #end
        >
            <slot name="end"></slot>
        </template>
    </Menubar>
</template>
