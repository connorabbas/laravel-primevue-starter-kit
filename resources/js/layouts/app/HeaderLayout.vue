<script setup>
import { useTemplateRef } from 'vue';
import { usePage } from '@inertiajs/vue3';
import { useAppLayout } from '@/composables/useAppLayout';
import { ChevronsUpDown, ChevronDown, Menu as MenuIcon } from 'lucide-vue-next';
import ClientOnly from '@/components/ClientOnly.vue';
import NavLogoLink from '@/components/NavLogoLink.vue';
import FlashMessages from '@/components/FlashMessages.vue';
import Menu from '@/components/primevue/menu/Menu.vue';
import Menubar from '@/components/primevue/menu/Menubar.vue';
import PanelMenu from '@/components/primevue/menu/PanelMenu.vue';
import Breadcrumb from '@/components/primevue/menu/Breadcrumb.vue';

const props = defineProps({
    breadcrumbs: {
        type: Array,
        required: false,
        default: () => [],
    },
});

const page = usePage();
const {
    currentRoute,
    mobileMenuOpen,
    menuItems,
    userMenuItems,
} = useAppLayout();

const userMenu = useTemplateRef('user-menu');
const toggleUserMenu = (event) => {
    userMenu.value.$el.toggle(event);
};

const mobileUserMenu = useTemplateRef('mobile-user-menu');
const toggleMobileUserMenu = (event) => {
    mobileUserMenu.value.$el.toggle(event);
};
</script>

<template>
    <div>
        <ClientOnly>
            <Teleport to="body">
                <!-- Mobile drawer menu -->
                <Drawer
                    v-model:visible="mobileMenuOpen"
                    position="right"
                >
                    <div>
                        <PanelMenu
                            :model="menuItems"
                            class="mt-1 w-full"
                        />
                    </div>
                    <template #footer>
                        <div class="flex flex-col">
                            <Button
                                id="mobile-user-menu-btn"
                                :label="page.props.auth.user.name"
                                severity="secondary"
                                size="large"
                                pt:root:class="flex flex-row-reverse justify-between"
                                @click="toggleMobileUserMenu($event)"
                            >
                                <template #icon>
                                    <ChevronsUpDown />
                                </template>
                            </Button>
                            <Menu
                                ref="mobile-user-menu"
                                :model="userMenuItems"
                                pt:root:class="z-[1200]"
                                popup
                            />
                        </div>
                    </template>
                </Drawer>
                <ScrollTop
                    :buttonProps="{ class: 'fixed! right-4! bottom-4! md:right-8! md:bottom-8! z-[1000]!', rounded: true, raised: true }"
                />
            </Teleport>
        </ClientOnly>
        <div class="min-h-screen">
            <!-- Primary Navigation Menu -->
            <nav class="dynamic-bg shadow-sm">
                <Container>
                    <Menubar
                        :key="currentRoute"
                        :model="menuItems"
                        pt:root:class="px-0 py-4 border-0 rounded-none dynamic-bg"
                        pt:button:class="hidden"
                    >
                        <template #start>
                            <div class="shrink-0 flex items-center mr-5">
                                <NavLogoLink />
                            </div>
                        </template>
                        <template #end>
                            <!-- User Dropdown Menu -->
                            <div class="hidden lg:flex items-center ms-6 space-x-3">
                                <div class="flex flex-col">
                                    <Button
                                        id="user-menu-btn"
                                        :label="page.props.auth.user.name"
                                        pt:root:class="flex flex-row-reverse justify-between"
                                        severity="secondary"
                                        text
                                        @click="toggleUserMenu($event)"
                                    >
                                        <template #icon>
                                            <ChevronDown />
                                        </template>
                                    </Button>
                                    <div
                                        id="user-menu-append"
                                        class="relative"
                                    />
                                    <Menu
                                        ref="user-menu"
                                        appendTo="#user-menu-append"
                                        :model="userMenuItems"
                                        pt:root:class="left-auto! top-0! right-0 z-[1200]"
                                        popup
                                    />
                                </div>
                            </div>

                            <!-- Mobile Menu Toggle -->
                            <div class="flex items-center lg:hidden">
                                <div class="relative">
                                    <Button
                                        severity="secondary"
                                        class="p-1!"
                                        text
                                        @click="mobileMenuOpen = true"
                                    >
                                        <template #icon>
                                            <MenuIcon class="size-6!" />
                                        </template>
                                    </Button>
                                </div>
                            </div>
                        </template>
                    </Menubar>
                </Container>
            </nav>

            <main>
                <Container vertical>
                    <!-- Session-based Flash Messages -->
                    <FlashMessages />

                    <!-- Breadcrumbs -->
                    <Breadcrumb
                        v-if="props.breadcrumbs.length"
                        :model="props.breadcrumbs"
                    />

                    <!-- Page Content -->
                    <slot />
                </Container>
            </main>
        </div>
    </div>
</template>
