<script setup>
import { usePage } from '@inertiajs/vue3';

const page = usePage();
</script>

<template>
    <Breadcrumb
        pt:root:class="p-0 bg-transparent"
        :home="{
            icon: 'pi pi-home',
            url: page.props.app.baseUrl,
        }"
    >
        <template #item="{ item, props }">
            <InertiaLink
                v-if="item.route"
                :href="item.route"
                class="p-breadcrumb-item-link"
                custom
            >
                <span
                    v-if="item.icon"
                    :class="item.icon"
                    class="p-breadcrumb-item-icon"
                />
                <span class="p-breadcrumb-item-label">{{ item.label }}</span>
            </InertiaLink>
            <a
                v-else
                :href="item.url"
                :target="item.target"
                v-bind="props.action"
            >
                <span
                    v-if="item.icon"
                    :class="item.icon"
                    class="p-breadcrumb-item-icon"
                />
                <span class="p-breadcrumb-item-label">{{ item.label }}</span>
            </a>
        </template>
        <template #separator> / </template>
    </Breadcrumb>
</template>
