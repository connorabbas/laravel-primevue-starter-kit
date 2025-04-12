# Laravel & PrimeVue Starter Kit

## About

![Static Badge](https://img.shields.io/badge/Laravel%20-%20v12%20-%20%23f9322c) ![Static Badge](https://img.shields.io/badge/Inertia.js%20-%20v2%20-%20%236b46c1) ![Static Badge](<https://img.shields.io/badge/Vue.js%20-%20v3.5%20-%20rgb(66%20184%20131)>) ![Static Badge](<https://img.shields.io/badge/PrimeVue%20-%20v4%20-%20rgb(16%20185%20129)>) ![Static Badge](https://img.shields.io/badge/Tailwind%20CSS%20-%20v4%20-%20%230284c7)

A basic authentication starter kit using [Laravel](https://laravel.com/docs/master), [Intertia.js](https://inertiajs.com/), [PrimeVue](https://primevue.org/) components, and [Tailwind CSS](https://tailwindcss.com/).

[Hosted Demo Project](https://laravel-primevue-starter-kit-demo.laravel.cloud/)

> [!TIP]
> Do you need a separate Vue SPA front-end instead of using Inertia.js? Consider using the [PrimeVue SPA & Laravel API Starter Kit](https://github.com/connorabbas/laravel-api-primevue-starter-kit) instead.

## Roadmap

-   [x] Hosted demo project
-   [x] Updated User profile settings pages (similar to official Laravel starter kits)
-   [x] Additional layouts (similar to official Laravel starter kits)
-   [x] Alternative admin branch using [spatie/laravel-permission](https://spatie.be/docs/laravel-permission/v6/introduction)
-   [x] Updated `connorabbas/laravel-api-primevue-starter-kit` project to match UI/functionality
-   [ ] TypeScript & SSR repo using [PrimeVue Volt](https://volt.primevue.org/) (In development)

## Features

-   Pre-configured [Auto Import](https://primevue.org/autoimport/) PrimeVue components
-   Extended PrimeVue menu/navigation components utilizing Inertia's `Link` component and [Lucide Icons](https://lucide.dev/)
-   `usePaginatedData()` & `useLazyDataTable()` composables for use with PrimeVue's `Paginator` & `DataTable` components for easy pagination/filtering/sorting
-   Light/dark/system color mode toggle
-   Easily customizable theming
-   Opt-in TypeScript usage
-   [Admin role branch](https://github.com/connorabbas/laravel-primevue-starter-kit/tree/feature/admin-role) using [spatie/laravel-permission](https://spatie.be/docs/laravel-permission/v6/introduction)

## Theme

This starter kit provides a collection of custom theme presets to choose from, built using the powerful **PrimeVue V4** theming system. It leverages styled mode and custom design token values to create flexible and cohesive UI designs.

### Provided Theme Presets

The theme presets are located in the `/resources/js/theme` directory. Each preset offers a distinct visual style:

-   **bootstrap**  
    Emulates the look and feel of [Bootstrap](https://getbootstrap.com/).

-   **breeze**  
    Captures the aesthetic of [Laravel Breeze](https://github.com/laravel/breeze). (R.I.P. :pray:)

-   **enterprise**  
    Provides a clean, no-nonsense corporate design.

-   **noir**  
    A minimal & clean monochromatic style that serves as the default theme.

-   **warm**  
    A boxy design with a warmer color pallette.

### Customizing Your Own Theme

Creating your own theme preset is simple. You can:

-   Swap the [primary](https://primevue.org/theming/styled/#primary) values with a different set of [colors](https://primevue.org/theming/styled/#colors).
-   Adjust the `colorScheme` [surface](https://primevue.org/theming/styled/#surface) values (e.g., slate, gray, neutral).
-   Change the extended [preset theme](https://primevue.org/theming/styled/#presets).

For detailed guidance on customization, please refer to the [PrimeVue Styled Mode Docs](https://primevue.org/theming/styled/).

### PrimeVue v4 w/ Tailwind CSS

To clarify, Tailwind is **not** used for any component styling in this starter kit; instead, we use PrimeVue's styled mode with a custom theme preset implementation for component styling. Tailwind is applied solely for layout purposes **around** PrimeVue components and for minimal styling when needed.

---

## Local Development with Docker

This starter kit is configured to use Docker Compose for local development with just a few extra steps, powered by images & configuration from [Laravel Sail](https://laravel.com/docs/master/sail). With this setup, you do not need PHP, Composer, PostgreSQL or Node.js installed on your machine to get up and running with this project.

### Setup

1. In a new directory (outside of your Laravel project) create a `docker-compose.yml` file to create a reverse proxy container using [Traefik](https://doc.traefik.io/traefik/getting-started/quick-start/). You can clone/reference this [example implementation](https://github.com/connorabbas/traefik-docker-compose/blob/master/docker-compose.yml).

2. Step into the directory containing the new compose file, and spin up the Traefik container:
    ```
    docker compose up -d
    ```
3. Update Laravel app `.env`

    ```env
    # Use any desired domain ending with .localhost
    # Match domain value in docker-compose.local.yml laravel service labels section
    APP_URL=http://laravel-primevue.localhost

    DB_CONNECTION=pgsql
    DB_HOST=pgsql # name of service
    DB_PORT=5432
    DB_DATABASE=laravel
    DB_USERNAME=sail
    DB_PASSWORD=password

    WWWGROUP=1000
    WWWUSER=1000

    # Update port values as needed when running multiple projects/services
    #APP_PORT=80 not required when using Traefik reverse proxy
    VITE_PORT=5173
    FORWARD_DB_PORT=5432
    ```

4. Build the Laravel app container using one of the following techniques:
    - Build manually using docker compose CLI
        ```bash
           docker compose -f docker-compose.local.yml up -d
        ```
    - Use [Laravel Sail](https://laravel.com/docs/master/sail)
    - Build as a [VS Code Dev Container](https://code.visualstudio.com/docs/devcontainers/tutorial) using the `Dev Containers: Reopen in Container` command

### Additional configuration

If you wish to add additional services, or swap out PostgreSQL with an alternative database, you can reference the [Laravel Sail stubs](https://github.com/laravel/sail/tree/1.x/stubs) and update the `docker-compose.local.yml` file as needed.
