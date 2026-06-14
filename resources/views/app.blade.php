<!DOCTYPE html>
<html
    lang="{{ str_replace('_', '-', app()->getLocale()) }}"
    @class(['dark' => request()->cookie('colorScheme', 'auto') === 'dark'])
>

<head>
    <meta charset="utf-8">
    <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
    >

    {{-- Inline script to detect system dark mode preference and apply it immediately --}}
    <script>
        (function () {
            const colorScheme = '{{ request()->cookie('colorScheme', 'auto') }}'
            if (colorScheme === 'dark' || (colorScheme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark')
            } else {
                document.documentElement.classList.remove('dark')
            }
        })();
    </script>

    {{-- Inline style to set the background color based on preferred color mode (set to theme colors if desired) --}}
    <style>
        html {
            background-color: #fff;
        }

        html.dark {
            background-color: #000;
        }
    </style>

    <link
        rel="icon"
        href="/favicon.ico"
        sizes="any"
    >
    <link
        rel="icon"
        href="/favicon.svg"
        type="image/svg+xml"
    >
    <link
        rel="apple-touch-icon"
        href="/apple-touch-icon.png"
    >

    @fonts
    @vite(['resources/js/app.ts', "resources/js/pages/{$page['component']}.vue"])
    <x-inertia::head>
        <title data-inertia>{{ config('app.name', 'Laravel') }}</title>
    </x-inertia::head>
</head>

<body class="font-sans antialiased h-full bg-surface-100 dark:bg-surface-950">
    <x-inertia::app />
</body>

</html>
