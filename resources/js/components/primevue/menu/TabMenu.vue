<script setup lang="ts">
import { useTemplateRef, computed } from 'vue';
import { usePage } from '@inertiajs/vue3';
import { route } from 'ziggy-js';
import Tabs from 'primevue/tabs';
import TabList, { type TabListProps } from 'primevue/tablist';
import Tab from 'primevue/tab';
import type { MenuItem } from '@/types';
import { ptViewMerge } from '@/utils';

interface ExtendedTabListProps extends Omit<TabListProps, 'items'> {
    items: MenuItem[];
}
const componentProps = defineProps<ExtendedTabListProps>();

const page = usePage();
const currentRoute = computed(() => {
    // Access page.url to trigger re-computation on navigation.
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const url = page.url;
    /* eslint-enable @typescript-eslint/no-unused-vars */
    return route().current();
});

type TabsType = InstanceType<typeof Tabs>;
const childRef = useTemplateRef<TabsType>('child-ref');
defineExpose({
    el: childRef,
});
</script>

<template>
    <Tabs
        ref="child-ref"
        v-bind="{ ...componentProps, ptOptions: { mergeProps: ptViewMerge } }"
        :value="currentRoute ?? '/'"
        scrollable
    >
        <TabList>
            <InertiaLink
                v-for="item in componentProps.items"
                :key="item.label"
                :href="item.route ?? ''"
                :class="['no-underline', { 'p-tab-active': item.active }]"
                custom
            >
                <Tab
                    v-if="item.route"
                    :value="item.route"
                    :class="[
                        'flex items-center gap-2 hover:text-color',
                        item.active ? 'p-tab-active' : 'text-muted-color'
                    ]"
                >
                    <i
                        v-if="item.icon"
                        :class="item.icon"
                    />
                    <component
                        :is="item.lucideIcon"
                        v-else-if="item.lucideIcon"
                    />
                    <span>{{ item.label }}</span>
                </Tab>
            </InertiaLink>
        </TabList>
    </Tabs>
</template>
