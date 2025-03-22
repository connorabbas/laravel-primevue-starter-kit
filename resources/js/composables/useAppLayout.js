import { ref, computed, onMounted, onUnmounted, watchEffect } from 'vue';
import { usePage, useForm } from '@inertiajs/vue3';
import { route } from 'ziggy-js';

export function useAppLayout() {
    const page = usePage();
    const currentRoute = computed(() => {
        // Access page.url to trigger re-computation on navigation.
        /* eslint-disable @typescript-eslint/no-unused-vars */
        const url = page.url;
        /* eslint-enable @typescript-eslint/no-unused-vars */
        return route().current();
    });

    // Menu items
    const menuItems = computed(() => [
        {
            label: 'Home',
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
        {
            label: 'Info',
            icon: 'pi pi-info-circle',
            items: [
                {
                    label: 'PrimeVue Docs',
                    url: 'https://primevue.org/',
                    icon: 'pi pi-prime',
                },
                {
                    label: 'Starter Kit Repo',
                    url: 'https://github.com/connorabbas/laravel-primevue-starter-kit',
                    icon: 'pi pi-github',
                },
            ],
        },
    ]);

    // User menu and logout functionality.
    const logoutForm = useForm({});
    const logout = () => {
        logoutForm.post(route('logout'));
    };
    const userMenuItems = [
        {
            label: 'Settings',
            route: route('profile.edit'),
            icon: 'pi pi-fw pi-cog',
        },
        {
            label: 'Log Out',
            icon: 'pi pi-fw pi-sign-out',
            command: () => logout(),
        },
    ];

    // Mobile menu
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

    return {
        currentRoute,
        menuItems,
        userMenuItems,
        mobileMenuOpen,
        logout,
    };
}
