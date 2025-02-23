<script setup>
import { ref, computed, useTemplateRef, onMounted, onUnmounted, watchEffect } from 'vue';
import { usePage, useForm } from '@inertiajs/vue3';
import ApplicationLogo from '@/Components/ApplicationLogo.vue';
import LinksMenu from '@/Components/PrimeVue/LinksMenu.vue';
import LinksMenuBar from '@/Components/PrimeVue/LinksMenuBar.vue';
import LinksPanelMenu from '@/Components/PrimeVue/LinksPanelMenu.vue';
import ToggleDarkModeButton from '@/Components/ToggleDarkModeButton.vue';

const page = usePage();
const currentRoute = computed(() => {
    // Access page.url to trigger re-computation on navigation.
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const url = page.url;
    /* eslint-enable @typescript-eslint/no-unused-vars */
    return route().current();
});

// Main menu
const mainMenuItems = computed(() => [
    {
        label: 'Dashboard',
        route: route('dashboard'),
        active: currentRoute.value == 'dashboard',
    },
]);

// User menu (desktop)
const userMenu = useTemplateRef('user-menu');
const logoutForm = useForm({});
const userMenuItems = [
    {
        label: 'Profile',
        route: route('profile.edit'),
        icon: 'pi pi-fw pi-user',
    },
    {
        label: 'Log Out',
        icon: 'pi pi-fw pi-sign-out',
        command: () => {
            logoutForm.post(route('logout'));
        },
    },
];
const toggleUserMenu = (event) => {
    userMenu.value.childRef.toggle(event);
};

// Mobile menu (Drawer)
const homeMobileMenuItems = computed(() => [
    {
        label: 'Welcome',
        icon: 'pi pi-home',
        route: route('welcome'),
        active: currentRoute.value == 'welcome',
    },
    {
        label: 'Dashboard',
        icon: 'pi pi-th-large',
        route: route('dashboard'),
        active: currentRoute.value == 'dashboard',
    },
]);
const mobileMenuOpen = ref(false);
const windowWidth = ref(window.innerWidth);
const updateWidth = () => {
    windowWidth.value = window.innerWidth;
};
onMounted(() => {
    window.addEventListener('resize', updateWidth);
});
onUnmounted(() => {
    window.removeEventListener('resize', updateWidth);
});
watchEffect(() => {
    if (windowWidth.value > 1024) {
        mobileMenuOpen.value = false;
    }
});
</script>

<template>
    <div>
        <div class="min-h-screen">
            <nav class="dynamic-bg shadow-sm">
                <!-- Primary Navigation Menu -->
                <Container>
                    <LinksMenuBar
                        :model="mainMenuItems"
                        :key="currentRoute"
                        pt:root:class="px-0 py-4 border-0 rounded-none dynamic-bg"
                        pt:button:class="hidden"
                    >
                        <template #start>
                            <!-- Logo -->
                            <div class="shrink-0 flex items-center mr-5">
                                <InertiaLink :href="route('welcome')">
                                    <ApplicationLogo
                                        class="block h-10 w-auto fill-current text-surface-900 dark:text-surface-0"
                                    />
                                </InertiaLink>
                            </div>
                        </template>
                        <template #end>
                            <div class="hidden lg:flex items-center ms-6 space-x-3">
                                <div>
                                    <ToggleDarkModeButton
                                        severity="secondary"
                                        rounded
                                        text
                                    />
                                </div>
                                <!-- User Dropdown Menu -->
                                <div class="flex flex-col">
                                    <Button
                                        id="user-menu-btn"
                                        severity="secondary"
                                        :label="page.props.auth.user.name"
                                        icon="pi pi-angle-down"
                                        iconPos="right"
                                        text
                                        @click="toggleUserMenu($event)"
                                    />
                                    <div
                                        id="user-menu-append"
                                        class="relative"
                                    ></div>
                                    <LinksMenu
                                        ref="user-menu"
                                        appendTo="#user-menu-append"
                                        :model="userMenuItems"
                                        pt:root:class="left-auto! top-0! right-0"
                                        popup
                                    />
                                </div>
                            </div>

                            <!-- Mobile Hamburger -->
                            <div class="flex items-center lg:hidden">
                                <div class="relative">
                                    <Button
                                        severity="secondary"
                                        icon="pi pi-bars"
                                        pt:icon:class="text-xl"
                                        text
                                        @click="mobileMenuOpen = true"
                                    />
                                </div>
                            </div>
                        </template>
                    </LinksMenuBar>
                </Container>

                <!-- Mobile drawer menu -->
                <Drawer
                    v-model:visible="mobileMenuOpen"
                    position="right"
                >
                    <template #header>
                        <ToggleDarkModeButton
                            severity="secondary"
                            rounded
                            text
                        />
                    </template>
                    <div>
                        <div class="space-y-5">
                            <div class="flex flex-col gap-2">
                                <p class="text-muted-color font-bold uppercase text-sm">
                                    Home
                                </p>
                                <LinksPanelMenu
                                    :model="homeMobileMenuItems"
                                    class="w-full"
                                />
                            </div>
                        </div>
                    </div>
                    <template #footer>
                        <div class="flex items-center gap-2">
                            <InertiaLink
                                :href="route('profile.edit')"
                                class="flex-auto"
                            >
                                <Button
                                    label="Profile"
                                    icon="pi pi-user"
                                    severity="secondary"
                                    outlined
                                    fluid
                                ></Button>
                            </InertiaLink>
                            <Button
                                label="Logout"
                                icon="pi pi-sign-out"
                                class="flex-auto"
                                severity="danger"
                                text
                                @click="logout"
                            ></Button>
                        </div>
                    </template>
                </Drawer>
            </nav>

            <!-- Page Content -->
            <Toast position="top-center" />
            <main>
                <slot />
            </main>
        </div>
    </div>
</template>
