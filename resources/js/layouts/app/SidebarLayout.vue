<script setup>
import { useTemplateRef } from 'vue';
import { usePage } from '@inertiajs/vue3';
import { useAppLayout } from '@/composables/useAppLayout';
import ApplicationLogo from '@/components/ApplicationLogo.vue';
import Menu from '@/components/primevue/Menu.vue';
import PanelMenu from '@/components/primevue/PanelMenu.vue';
import Breadcrumb from '@/components/primevue/Breadcrumb.vue';
import { ChevronsUpDown, Menu as MenuIcon } from 'lucide-vue-next';

const props = defineProps({
    breadcrumbs: {
        type: Array,
        required: false,
        default: () => [],
    },
});

const page = usePage();
const {
    mobileMenuOpen,
    menuItems,
    userMenuItems,
} = useAppLayout();

const userMenu = useTemplateRef('user-menu');
const toggleUserMenu = (event) => {
    userMenu.value.childRef.toggle(event);
};

const mobileUserMenu = useTemplateRef('mobile-user-menu');
const toggleMobileUserMenu = (event) => {
    mobileUserMenu.value.childRef.toggle(event);
};
</script>

<template>
    <div class="h-screen flex flex-col">
        <Teleport to="body">
            <!-- Mobile drawer menu -->
            <Drawer
                v-model:visible="mobileMenuOpen"
                position="right"
            >
                <div>
                    <PanelMenu
                        :model="menuItems"
                        class="w-full"
                    />
                </div>
                <template #footer>
                    <div class="flex flex-col">
                        <Button
                            id="mobile-user-menu-btn"
                            :label="page.props.auth.user.name"
                            pt:root:class="flex flex-row-reverse justify-between"
                            severity="secondary"
                            @click="toggleMobileUserMenu($event)"
                        >
                            <template #icon>
                                <ChevronsUpDown class="size-4" />
                            </template>
                        </Button>
                        <Menu
                            ref="mobile-user-menu"
                            :model="userMenuItems"
                            popup
                        />
                    </div>
                </template>
            </Drawer>
            <Toast position="top-center" />
        </Teleport>

        <!-- Mobile Header -->
        <header class="block lg:fixed top-0 left-0 right-0 z-50">
            <nav class="dynamic-bg shadow-sm flex justify-between items-center lg:hidden">
                <Container class="grow">
                    <div class="flex justify-between items-center py-4">
                        <div>
                            <InertiaLink :href="route('welcome')">
                                <ApplicationLogo
                                    class="block h-8 w-auto fill-current text-surface-900 dark:text-surface-0"
                                />
                            </InertiaLink>
                        </div>
                        <div>
                            <Button
                                severity="secondary"
                                text
                                @click="mobileMenuOpen = true"
                            >
                                <template #icon>
                                    <MenuIcon class="size-6" />
                                </template>
                            </Button>
                        </div>
                    </div>
                </Container>
            </nav>
        </header>

        <div class="flex-1">
            <!-- Desktop Sidebar -->
            <aside
                class="w-[18rem] inset-0 hidden lg:block fixed overflow-y-auto overflow-x-hidden dynamic-bg border-r dynamic-border"
            >
                <div class="w-full h-full flex flex-col justify-between p-4">
                    <div class="space-y-6">
                        <div class="p-2">
                            <InertiaLink :href="route('welcome')">
                                <ApplicationLogo
                                    class="block h-10 w-auto fill-current text-surface-900 dark:text-surface-0"
                                />
                            </InertiaLink>
                        </div>
                        <div>
                            <PanelMenu
                                :model="menuItems"
                                class="w-full"
                            />
                        </div>
                    </div>
                    <div>
                        <Button
                            id="user-menu-btn"
                            :label="page.props.auth.user.name"
                            pt:root:class="flex flex-row-reverse justify-between"
                            severity="secondary"
                            fluid
                            @click="toggleUserMenu($event)"
                        >
                            <template #icon>
                                <ChevronsUpDown class="size-4" />
                            </template>
                        </Button>
                        <Menu
                            ref="user-menu"
                            :model="userMenuItems"
                            popup
                        />
                    </div>
                </div>
            </aside>

            <!-- Scrollable Content -->
            <div class="flex flex-col h-full lg:pl-[18rem]">
                <Container
                    vertical
                    fluid
                >
                    <!-- Breadcrumbs -->
                    <Breadcrumb
                        v-if="props.breadcrumbs.length"
                        :model="props.breadcrumbs"
                    />

                    <!-- Page Content -->
                    <main
                        id="page-content"
                        class="grow"
                    >
                        <slot />
                    </main>
                </Container>
            </div>
        </div>
    </div>
</template>
