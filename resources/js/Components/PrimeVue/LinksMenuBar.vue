<script setup>
import { useTemplateRef } from "vue";

const childRef = useTemplateRef("child-ref");
defineExpose({
    childRef,
});
</script>

<template>
    <Menubar ref="child-ref">
        <template v-if="$slots.start" #start>
            <slot name="start"></slot>
        </template>
        <template #item="{ item, props, hasSubmenu, root }">
            <Link
                v-if="item.route"
                :href="item.route"
                class="hidden sm:hidden md:hidden lg:flex p-menuitem-link"
                :class="{
                    'font-bold text-primary': item.active,
                    'text-color-secondary': root && !item.active,
                }"
                custom
            >
                <span
                    v-if="item.icon"
                    :class="[item.icon, 'mr-2', 'text-color-secondary']"
                />
                <span>{{ item.label }}</span>
                <span
                    v-if="hasSubmenu"
                    class="pi pi-fw pi-angle-down ml-2 text-sm"
                />
            </Link>
            <a
                v-else
                :href="item.url"
                :target="item.target"
                v-bind="props.action"
                class="text-color-secondary"
            >
                <span
                    v-if="item.icon"
                    :class="[item.icon, 'mr-2', 'text-color-secondary']"
                />
                <span>{{ item.label }}</span>
                <span
                    v-if="hasSubmenu"
                    class="pi pi-fw pi-angle-down ml-2 text-sm"
                />
            </a>
        </template>
        <template v-if="$slots.end" #end>
            <slot name="end"></slot>
        </template>
    </Menubar>
</template>
