# Laravel, Inertia.js, & PrimeVue Starter Kit

> [!CAUTION]
> This branch is no longer maintained, please use the [feature/admin-role](https://github.com/connorabbas/laravel-primevue-starter-kit/tree/feature/admin-role) branch instead.

## About

![Static Badge](https://img.shields.io/badge/Laravel%20-%20v12%20-%20%23f9322c) ![Static Badge](https://img.shields.io/badge/Inertia.js%20-%20v2%20-%20%236b46c1) ![Static Badge](<https://img.shields.io/badge/Vue.js%20-%20v3.5%20-%20rgb(66%20184%20131)>) ![Static Badge](<https://img.shields.io/badge/PrimeVue%20-%20v4%20-%20rgb(16%20185%20129)>) ![Static Badge](https://img.shields.io/badge/Tailwind%20CSS%20-%20v4%20-%20%230284c7)

A basic authentication starter kit using [Laravel](https://laravel.com/docs/master), [Intertia.js](https://inertiajs.com/), [PrimeVue](https://primevue.org/) components, and [Tailwind CSS](https://tailwindcss.com/). An equivalent to using [Laravel Breeze](https://laravel.com/docs/11.x/starter-kits#laravel-breeze), but with the added benefit of all the PrimeVue components at your disposal.

```
git clone -b feature/admin-panel https://github.com/connorabbas/laravel-inertia-primevue.git
```

## Admin Panel

This branch provides a separate `admin` auth guard for admins to login to the "backend" of the application.

The following features are provided:

-   Admin registration via artisan command
-   Fully integrated authentication features (same as standard User model)
    -   Forgot / reset password flow
    -   Email verification flow with middleware
    -   Profile page to manage account settings
    -   Tests to cover all authentication / authorization / profile update processes
-   Separate Admin Layout
-   Example data index page (using registered User model data)

### Register new Admin User

Since there is no registration page for admins, use the following artisan command:

```
php artisan admin:create
```

Use the `/admin/login` route to login.

### User Data

An example index data page is provided at the `/admin/users` route. To seed with 100 test Users (locally):

```
php artisan db:seed
```

### Changes

[Compare against the master branch](https://github.com/connorabbas/primevue-breeze-inertia/compare/master...feature/admin-panel)
