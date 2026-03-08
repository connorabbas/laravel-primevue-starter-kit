<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
    >

    <title inertia>{{ config('app.name', 'Laravel') }}</title>

    <script>
        // To avoid flashings in the SSR because of the selected color scheme
        const theme = localStorage.getItem('vueuse-color-scheme') || 'auto'
        if (theme === 'dark' || (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    </script>

    <!-- Fonts -->
    <link
        rel="preconnect"
        href="https://fonts.bunny.net"
    >
    <link
        href="https://fonts.bunny.net/css?family=inter:400,500,600&display=swap"
        rel="stylesheet"
    />

    <!-- Scripts -->
    @routes
    @vite(['resources/js/app.ts', "resources/js/pages/{$page['component']}.vue"])
    @inertiaHead
</head>

<body class="font-sans antialiased h-full bg-surface-100 dark:bg-surface-950">
    @inertia
</body>

</html>
