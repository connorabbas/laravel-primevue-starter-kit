<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import { Link as InertiaLink } from '@inertiajs/vue3'
import Breadcrumb, { type BreadcrumbPassThroughOptions, type BreadcrumbProps } from 'primevue/breadcrumb'
import { ChevronRight } from 'lucide-vue-next'
import type { MenuItem } from '@/types'
import { ptViewMerge } from '@/utils'

interface ExtendedBreadcrumbProps extends Omit<BreadcrumbProps, 'model'> {
    model?: MenuItem[] | undefined;
}
const componentProps = defineProps<ExtendedBreadcrumbProps>()

const defaultPt = ref<BreadcrumbPassThroughOptions>({
    root: 'p-0 bg-transparent'
})

type BreadcrumbType = InstanceType<typeof Breadcrumb>;
const childRef = useTemplateRef<BreadcrumbType>('child-ref')
defineExpose({ $el: childRef })
</script>

<template>
    <Breadcrumb
        ref="child-ref"
        v-bind="{ ...componentProps, pt: defaultPt, ptOptions: { mergeProps: ptViewMerge } }"
    >
        <template #item="{ item, props }">
            <InertiaLink
                v-if="item.visible !== false && item.route"
                :href="item.route"
                :target="item.target"
                :class="['p-breadcrumb-item-link', item.class]"
                :style="item.style"
                :aria-disabled="item.disabled === true"
                custom
            >
                <i
                    v-if="item.icon"
                    :class="['p-breadcrumb-item-icon', item.icon]"
                />
                <component
                    :is="item.lucideIcon"
                    v-else-if="item.lucideIcon"
                    :class="['p-breadcrumb-item-icon', item.lucideIconClass]"
                />
                <span class="p-breadcrumb-item-label">{{ item.label }}</span>
            </InertiaLink>
            <a
                v-else-if="item.visible !== false"
                v-bind="props.action"
                :href="item.url"
                :target="item.target"
                :class="item.class"
                :style="item.style"
                :aria-disabled="item.disabled === true"
            >
                <i
                    v-if="item.icon"
                    :class="['p-breadcrumb-item-icon', item.icon]"
                />
                <component
                    :is="item.lucideIcon"
                    v-else-if="item.lucideIcon"
                    :class="['p-breadcrumb-item-icon', item.lucideIconClass]"
                />
                <span class="p-breadcrumb-item-label">{{ item.label }}</span>
            </a>
        </template>
        <template #separator>
            <ChevronRight />
        </template>
    </Breadcrumb>
</template>
