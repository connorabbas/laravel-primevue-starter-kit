# Laravel, Inertia.js, & PrimeVue Starter Kit

## About

![Static Badge](https://img.shields.io/badge/Laravel%20-%20v11%20-%20%23f9322c) ![Static Badge](https://img.shields.io/badge/Inertia.js%20-%20v2%20-%20%236b46c1) ![Static Badge](<https://img.shields.io/badge/Vue.js%20-%20v3.5%20-%20rgb(66%20184%20131)>) ![Static Badge](<https://img.shields.io/badge/PrimeVue%20-%20v4%20-%20rgb(16%20185%20129)>) ![Static Badge](https://img.shields.io/badge/Tailwind%20CSS%20-%20v4%20-%20%230284c7)

> [!NOTE]
> This branch is no longer maintained, since PrimeTek is no longer supporting the [Tailwind Theme](https://primevue.org/tailwind/#tailwind-theme) for Tailwind V4.

A basic authentication starter kit using [Laravel](https://laravel.com/docs/master), [Intertia.js](https://inertiajs.com/), [PrimeVue](https://primevue.org/) components, and [Tailwind CSS](https://tailwindcss.com/). An equivalent to using [Laravel Breeze](https://laravel.com/docs/master/starter-kits#laravel-breeze), but with the added benefit of all the PrimeVue components at your disposal.

```
git clone -b legacy-ssr https://github.com/connorabbas/laravel-inertia-primevue.git
```

This branch is tailored towards content-driven applications that rely on Server-Side Rendering (SSR).

Run the site with SSR:

```
npm run build
```

```
php artisan inertia:start-ssr
```

## PrimeVue V4 and SSR

With **PrimeVue V4** [styled mode](https://primevue.org/theming/styled/), component styles are dynamically generated on the client side based on the design token values configured in your theme. This approach is well-suited for Single Page Applications (SPAs), where the initial render begins with a blank page, hydration seamlessly takes over, and client-side routing ensures smooth navigation.

However, this dynamic styling mechanism introduces challenges for Server-Side Rendering (SSR).

### V4 Styled Mode - The Problem

In an SSR setup, the DOM structure is sent from the server to the client without accompanying styles. Components do not receive their generated styles until JavaScript is fully loaded and executed on the client side. This delay leads to a visually "jumpy" UI, where components appear unstyled for a brief moment before the client-side styling is applied.

This issue is particularly noticeable when the page's content or structure depends heavily on PrimeVue components, such as:

-   Layout components like `Menubar`
-   Frequently used UI elements like `Card`, `InputText`, `Select`, `Button`, etc.

The result is a suboptimal user experience for SSR apps using styled mode with PrimeVue V4.

### Comparison to PrimeVue V3

In **PrimeVue V3**, component styles were loaded from precompiled SASS/CSS files. This system worked seamlessly with SSR because the styles could be directly included on the server side, ensuring fully styled components at the initial render. There was no delay in applying styles, avoiding any "jumpy" UI.

While **PrimeVue V4** offers significant improvements in configurability, such as supporting dynamic theme adjustments, better light/dark mode support, and more granular customization through design tokens, it comes at the cost of simplicity and SSR compatibility that V3 provided.

### The Solution

A technically possible but overly complicated solution would involve tapping into the running Node.js process used by `php artisan inertia:start-ssr` to generate the styles on the server side before sending them to the client. This approach might involve creating middleware to dynamically inject generated styles during the SSR process. However, this method is not ideal for several reasons:

-   It adds unnecessary complexity to the SSR process, just for styling.
-   It risks tampering with the existing SSR Node.js process, potentially introducing unforeseen issues.

A better and more practical solution is to use the [PrimeVue Tailwind Theme](https://primevue.org/tailwind/#tailwind-theme) in unstyled mode. The [Tailwind version of PrimeVue](https://tailwind.primevue.org/) leverages Tailwind's utility-first CSS classes and the `@apply` directive to style PrimeVue components. These styles are applied within `.css` files that can be loaded server side, and are fully configurable.

This approach ensures:

1. Fully styled components during the initial render in SSR.
2. No "jumpy" UI issues when refreshing the Vue SSR app.
3. Simplicity and maintainability without tampering with the SSR Node.js process.

By opting for the Tailwind Theme, it is still possible to achieve a modern, customizable design system while retaining the benefits of server-side styling compatibility.

### Styling & Configuration

In other branches, component styling is handled by preset themes using styled mode. With this Tailwind Theme version, the configuration of custom base styles is instead handled via CSS variables within the `resources/css/styles.css` file.

The component styles reside within the `resources/css/primevue` directory, copied from the latest release of the [primefaces/primevue-tailwind](https://github.com/primefaces/primevue-tailwind/releases) styles.

CSS layers have also been implemented so that Tailwind utilities can override the PrimeVue component styling when needed. Feel free to revert this change and use the default example [styles import](https://tailwind.primevue.org/vite/#importstyles) provided by PrimeVue.

### Changes

[Compare against the master branch](https://github.com/connorabbas/primevue-breeze-inertia/compare/master...legacy-ssr)
