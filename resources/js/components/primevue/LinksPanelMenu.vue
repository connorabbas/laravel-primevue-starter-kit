<template>
    <PanelMenu
        pt:root:class="p-0 m-0 gap-1"
        pt:panel:class="p-0 border-0"
        pt:header:class="p-0 border-0"
        pt:itemContent:class="gap-1"
    >
        <template #item="{ item, active }">
            <InertiaLink
                v-if="item.route"
                :href="item.route"
                :class="[
                    'p-panelmenu-item-link flex items-center cursor-pointer no-underline px-4 py-2',
                    { 'font-bold! text-muted-color': item.active }
                ]"
                custom
            >
                <i
                    v-if="item.icon"
                    :class="[
                        'mr-2 p-panelmenu-item-icon',
                        item.icon,
                    ]"
                />
                <span>{{ item.label }}</span>
            </InertiaLink>
            <a
                v-else
                :href="item.url"
                :target="item.target"
                :class="[
                    'flex items-center cursor-pointer no-underline px-4 py-2',
                    item.items ? 'p-panelmenu-header-link' : 'p-panelmenu-item-link',
                ]"
            >
                <i
                    v-if="item.icon"
                    :class="[
                        'mr-2 p-panelmenu-item-icon',
                        item.icon,
                    ]"
                />
                <span>{{ item.label }}</span>
                <span
                    v-if="item.items"
                    :class="[
                        'pi p-panelmenu-submenu-icon ml-auto',
                        active ? 'pi-angle-down' : 'pi-angle-right',
                    ]"
                />
            </a>
        </template>
    </PanelMenu>
</template>
