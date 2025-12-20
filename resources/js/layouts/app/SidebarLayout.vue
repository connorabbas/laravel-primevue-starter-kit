<script setup lang="ts">
import { usePage } from '@inertiajs/vue3'
import { useStorage } from '@vueuse/core'
import {
    ChevronsUpDown,
    Menu as MenuIcon,
    PanelLeftClose,
    PanelLeftOpen
} from 'lucide-vue-next'
import { useAppLayout } from '@/composables/useAppLayout'
import ClientOnly from '@/components/ClientOnly.vue'
import Container from '@/components/Container.vue'
import PopupMenuButton from '@/components/PopupMenuButton.vue'
import FlashMessages from '@/components/FlashMessages.vue'
import NavLogoLink from '@/components/NavLogoLink.vue'
import PanelMenu from '@/components/router-link-menus/PanelMenu.vue'
import Breadcrumb from '@/components/router-link-menus/Breadcrumb.vue'
import { MenuItem } from '@/types'

const props = withDefaults(defineProps<{
    breadcrumbs?: MenuItem[],
}>(), {
    breadcrumbs: () => [],
})

const page = usePage()
const {
    mobileMenuOpen,
    menuItems,
    expandedKeys,
    userMenuItems,
} = useAppLayout()

const sidebarOpen = useStorage('desktop-sidebar-open', true)
const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value
}
</script>

<template>
    <div class="h-screen flex flex-col">
        <ClientOnly>
            <Teleport to="body">
                <Drawer
                    v-model:visible="mobileMenuOpen"
                    position="right"
                >
                    <div>
                        <PanelMenu
                            v-model:expandedKeys="expandedKeys"
                            :model="menuItems"
                            class="mt-1 w-full"
                        />
                    </div>
                    <template #footer>
                        <PopupMenuButton
                            name="mobile-user-menu-dd"
                            severity="secondary"
                            size="large"
                            :menu-items="userMenuItems"
                            :label="page.props.auth.user.name"
                        >
                            <template #icon>
                                <ChevronsUpDown />
                            </template>
                        </PopupMenuButton>
                    </template>
                </Drawer>
                <ScrollTop
                    :buttonProps="{ class: 'fixed! right-4! bottom-4! md:right-8! md:bottom-8! z-[1000]!', rounded: true, raised: true }"
                />
            </Teleport>
        </ClientOnly>

        <!-- Mobile Header -->
        <header class="block lg:fixed top-0 left-0 right-0 z-50">
            <nav class="dynamic-bg shadow-sm flex justify-between items-center lg:hidden">
                <Container class="grow">
                    <div class="flex justify-between items-center gap-4 py-4">
                        <div>
                            <NavLogoLink />
                        </div>
                        <div>
                            <Button
                                severity="secondary"
                                text
                                @click="mobileMenuOpen = true"
                            >
                                <template #icon>
                                    <MenuIcon class="size-6!" />
                                </template>
                            </Button>
                        </div>
                    </div>
                </Container>
            </nav>
        </header>

        <div class="flex-1">
            <aside
                class="w-[18rem] inset-0 hidden lg:block fixed overflow-y-auto overflow-x-hidden dynamic-bg border-r dynamic-border transition-transform duration-300 ease-in-out"
                :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full'"
            >
                <div class="w-full h-full flex flex-col justify-between p-4">
                    <div class="space-y-6">
                        <div class="p-2">
                            <NavLogoLink />
                        </div>
                        <div>
                            <PanelMenu
                                v-model:expandedKeys="expandedKeys"
                                :model="menuItems"
                                class="mt-1 w-full"
                            />
                        </div>
                    </div>
                    <div>
                        <PopupMenuButton
                            name="desktop-user-menu-dd"
                            severity="secondary"
                            :menu-items="userMenuItems"
                            :label="page.props.auth.user.name"
                        >
                            <template #icon>
                                <ChevronsUpDown />
                            </template>
                        </PopupMenuButton>
                    </div>
                </div>
            </aside>

            <main
                class="flex flex-col h-full transition-[padding] duration-300 ease-in-out"
                :class="sidebarOpen ? 'lg:pl-[18rem]' : 'lg:pl-0'"
            >
                <Container
                    vertical
                    fluid
                >
                    <FlashMessages />

                    <div class="flex gap-4 items-center">
                        <Button
                            v-tooltip.right="`${sidebarOpen ? 'Collapse' : 'Expand'} Sidebar`"
                            class="hidden lg:flex"
                            severity="secondary"
                            outlined
                            @click="toggleSidebar()"
                        >
                            <template #icon>
                                <PanelLeftClose v-if="sidebarOpen" />
                                <PanelLeftOpen v-else />
                            </template>
                        </Button>
                        <Breadcrumb
                            v-if="props.breadcrumbs.length"
                            :model="props.breadcrumbs"
                        />
                    </div>

                    <!-- Page Content -->
                    <slot />
                </Container>
            </main>
        </div>
    </div>
</template>
