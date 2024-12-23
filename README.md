# Laravel, Inertia.js, & PrimeVue w/ PrimeFlex


## Theming
### Public Theme Files
Before running the Vite dev server for local development, you are required to run the Vite build process (`npm run build`). The reason for running the build process locally is to gather the necessary theme files for the application, which are copied into the site's `/public/themes` directory via the [vite-plugin-static-copy](https://github.com/sapphi-red/vite-plugin-static-copy#readme) plugin in the `vite.config.js` file.

The alternative to this approach would be manually copying the theme folders from `node_modules/primevue/resources/themes` into the `public/themes` directory, and committing the folders/files to your repository source code. (Would require removing the `.gitignore` rule as well)

### Changing Themes
Both the file copying process, and the light/dark theme toggle functionality rely on the `VITE_LIGHT_THEME` and `VITE_DARK_THEME` `.env` values.

To change what themes are used on the site for light and dark modes, simply modify the string values to any theme name that is available from [PrimeVue's Built-in Themes](https://v3.primevue.org/theming/#builtinthemes). After changing the values to your desired themes, you will need to run the `npm run build` command again, to copy the theme files for use.

The `aura-light-blue` and `aura-dark-blue` themes are used by default.
