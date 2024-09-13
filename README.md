# Laravel Breeze & PrimeVue
A starter kit using [Laravel Breeze](https://laravel.com/docs/master/starter-kits#laravel-breeze) with the [Intertia.js](https://inertiajs.com/) Vue option, utilizing [PrimeVue](https://primevue.org/) components.

## Installation 
1. Clone the repo (or download the zip)
   ```
   git clone --single-branch --branch admin-panel https://github.com/connorabbas/primevue-breeze-inertia.git
   ```

2. Step into the project directory
   ```
   cd ./primevue-breeze-inertia
   ```

3. Install the framework and other packages
   ```
   composer install
   ```

3. Setup `.env` file

   Windows
   ```
   copy .env.example .env
   ```
   Unix/Linux/MacOS
   ```
   cp .env.example .env
   ```

4. Generate the app key
   ```
   php artisan key:generate
   ```

5. Migrate database tables (after `.env` and database related config setup)
   ```
   php artisan migrate
   ```

6. Install npm packages
   ```
   npm install
   ```

7. Start the Vite dev server
   ```
   npm run dev
   ```

## Admin Area
### About
This branch provides a separate `admin` auth guard for admins to login to the "backend" of the application.

The following features are provided:
- Admin registration via artisan command
- Fully integrated authentication features (same as standard User model)
    - Forgot / reset password flow
    - Email verification flow with middleware
    - Profile page to manage account settings
    - Tests to cover all authentication / authorization / profile update processes
- Separate Admin Layout
- Example data index page (using registered User model data)

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
[Compare against the master branch](https://github.com/connorabbas/primevue-breeze-inertia/compare/master...admin-panel)

## Theme
This starter kit provides a light/dark mode and custom theme functionality provided by the powerful PrimeVue theming system, using styled mode and custom design token values.

The starting point for customizing your theme will be the `resources/js/theme-preset.js` module file. To quickly change the look and feel of your theme, swap the [primary](https://primevue.org/theming/styled/#primary) values with a different set of [colors](https://primevue.org/theming/styled/#colors), change the [surface](https://primevue.org/theming/styled/#surface) `colorScheme` values (slate, gray, neutral, etc.), or completely change the [preset theme](https://primevue.org/theming/styled/#presets) (Aura used by default).

Please reference the [PrimeVue Styled Mode Docs](https://primevue.org/theming/styled/) to fully understand how this system works, and how to further customize your theme to make it your own.

## PrimeVue v4 w/ Tailwind CSS
If you have used a previous version of this project using PrimeVue v3, you'll know that Tailwind was removed in favor of PrimeFlex. With v4 however, the PrimeTek team has officially suggested [Moving from PrimeFlex to Tailwind CSS](https://primevue.org/guides/primeflex/).

For this reason, Tailwind has been added back into the project and is utilized with the [tailwindcss-primeui](https://primevue.org/tailwind/#plugin) plugin. CSS layers have also been implemented so the Tailwind utilities can [override](https://primevue.org/tailwind/#override) the PrimeVue component styling when needed.