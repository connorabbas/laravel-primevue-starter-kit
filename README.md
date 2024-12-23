# Laravel, Inertia.js, & PrimeVue w/ PrimeFlex

## Theming

### Public Theme Files

Before running the Vite dev server for local development, you are required to run the Vite build process (`npm run build`). The reason for running the build process locally is to gather the necessary theme files for the application, which are copied into the site's `/public/themes` directory via the [vite-plugin-static-copy](https://github.com/sapphi-red/vite-plugin-static-copy#readme) plugin in the `vite.config.js` file.

The alternative to this approach would be manually copying the theme folders from `node_modules/primevue/resources/themes` into the `public/themes` directory, and committing the folders/files to your repository source code. (Would require removing the `.gitignore` rule as well)

### Changing Themes

Both the file copying process, and the light/dark theme toggle functionality rely on the `VITE_LIGHT_THEME` and `VITE_DARK_THEME` `.env` values.

To change what themes are used on the site for light and dark modes, simply modify the string values to any theme name that is available from [PrimeVue's Built-in Themes](https://v3.primevue.org/theming/#builtinthemes). After changing the values to your desired themes, you will need to run the `npm run build` command again, to copy the theme files for use.

The `aura-light-blue` and `aura-dark-blue` themes are used by default.

## Usage with Docker

This starter kit is configured to use Docker Compose for local development with a few extra configuration steps. With this setup, you do not need PHP, Composer, PostgreSQL or Node.js installed on your machine to get up and running with this project.

### Setup

1. In a new directory (outside of your Laravel project) create a `docker-compose.yml` file to create a reverse proxy container using [Traefik](https://doc.traefik.io/traefik/getting-started/quick-start/). You can reference this [example implementation](https://github.com/connorabbas/traefik-docker-compose/blob/master/docker-compose.yml).

2. Step into the directory containing the new compose file, and spin up the Traefik container:
    ```
    docker compose up -d
    ```
3. Update Laravel app `.env`

    ```env
    # Use any desired domain ending with .localhost
    # Match with value used in docker-compose.local.yml
    APP_URL=http://primevue-inertia.localhost

    DB_CONNECTION=pgsql
    DB_HOST=pgsql # name of service
    DB_PORT=5432
    DB_DATABASE=laravel
    DB_USERNAME=sail
    DB_PASSWORD=password

    # Update as needed for running multiple projects
    APP_PORT=8000
    VITE_PORT=5173
    FORWARD_DB_PORT=5432
    ```

4. Build the Laravel app container:
    - Either build manually with docker compose (like above), use [Laravel Sail](https://laravel.com/docs/master/sail), or build as a [VS Code Dev Container](https://code.visualstudio.com/docs/devcontainers/tutorial) using the `Dev Containers: Reopen in Container` command.

### Additional configuration

If you wish to add additional services, or swap out PostgreSQL with an alternative database, you can reference the [Laravel Sail stubs](https://github.com/laravel/sail/tree/1.x/stubs) and update the `docker-compose.local.yml` file as needed.
