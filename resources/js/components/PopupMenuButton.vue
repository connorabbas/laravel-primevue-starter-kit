<script setup lang="ts">
/**
 * @see https://primevue.org/menu/#popup
 * Intended for single-instance use cases, could also be called a "Dropdown"
 * For a looped dataset (ex. DataTable) it's better to have just one Menu component on the page (outside the v-for)
 * then have multiple Buttons to trigger the Menu, dynamically changing the content based on the iteration dataset
 */

import { computed, useTemplateRef } from 'vue'
import Menu from '@/components/primevue/menu/Menu.vue'
import Button, { type ButtonProps } from 'primevue/button'
import { ChevronDown } from 'lucide-vue-next'
import { MenuItem } from '@/types'
import { ptViewMerge } from '@/utils'

// Forward the component attributes/props to the Button component
defineOptions({
    inheritAttrs: false
})

interface Props extends /* @vue-ignore */ ButtonProps {
    name: string,
    menuItems: MenuItem[],
    side?: 'left' | 'right', // leave empty for auto-target (body)
    label?: string, // already included in ButtonProps, explicity added to work within template logic
}
const props = withDefaults(defineProps<Props>(), {})

const appendToId = computed(() => {
    return props.name.replace(/[^a-zA-Z0-9]/g, '') + '_append'
})

type MenuType = InstanceType<typeof Menu>;
const dropdownMenu = useTemplateRef<MenuType>(props.name)
const toggleDropdownMenu = (event: Event) => {
    if (dropdownMenu.value) {
        dropdownMenu.value.toggle(event)
    }
}

const menuPositionClasses = computed(() => {
    let classes = ''
    if (props?.side) {
        switch (props?.side) {
        case 'left':
            classes = 'left-auto! top-0! left-0'
            break
        case 'right':
            classes = 'left-auto! top-0! right-0'
            break
        default:
            break
        }
    }

    return classes
})
</script>

<template>
    <div class="flex flex-col">
        <Button
            v-bind="{ ...props, ...$attrs, ptOptions: { mergeProps: ptViewMerge } }"
            :pt:root:class="{ 'flex flex-row-reverse justify-between': props?.label && !$slots.default }"
            @click="toggleDropdownMenu($event)"
        >
            <template
                v-if="$slots.loadingicon"
                #loadingicon="slotProps"
            >
                <slot
                    name="loadingicon"
                    v-bind="slotProps"
                />
            </template>
            <template
                v-if="$slots.icon || props?.label"
                #icon="slotProps"
            >
                <slot
                    name="icon"
                    v-bind="slotProps"
                >
                    <ChevronDown />
                </slot>
            </template>
            <template
                v-if="$slots.default && !props?.label"
                #default="slotProps"
            >
                <slot
                    name="default"
                    v-bind="slotProps"
                />
            </template>
        </Button>
        <div
            v-if="props?.side"
            :id="appendToId"
            class="relative"
        />
        <Menu
            :ref="props.name"
            :appendTo="props?.side ? `#${appendToId}` : 'body'"
            :model="props.menuItems"
            :pt:root:class="['z-1200 w-50 min-w-max', menuPositionClasses]"
            popup
        />
    </div>
</template>
