<template>
    <PanelMenu
        :pt="{
            root: {
                class: 'p-0 m-0 flex flex-column gap-1',
            },
            panel: {
                class: 'p-0 m-0 border-none',
            },
            header: {
                class: 'p-0 border-none',
            },
            headerContent: {
                class: 'hover:surface-100 border-round-md border-none',
            },
            menuContent: {
                class: 'flex flex-column gap-1',
            },
            content: {
                class: 'hover:surface-50 border-round-md',
            },
        }"
    >
        <template #item="{ item, active }">
            <Link
                v-if="item.route"
                :href="item.route"
                custom
                class="flex align-items-center gap-2 cursor-pointer text-decorate-none px-3 py-2"
                :class="{
                    'font-bold text-primary': item.active,
                }"
            >
                <i
                    v-if="item.icon"
                    :class="item.icon"
                    class="text-color-secondary"
                />
                <span>{{ item.label }}</span>
            </Link>
            <a
                v-else
                class="flex align-items-center gap-2 cursor-pointer text-decorate-none px-3 py-2"
                :href="item.url"
                :target="item.target"
            >
                <span
                    v-if="item.items"
                    :class="[
                        'pi text-color-secondary',
                        active ? 'pi-angle-down' : 'pi-angle-right',
                    ]"
                />
                <i
                    v-if="item.icon"
                    :class="item.icon"
                    class="text-color-secondary"
                />
                <span>{{ item.label }}</span>
            </a>
        </template>
    </PanelMenu>
</template>
