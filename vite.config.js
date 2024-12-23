import { defineConfig, loadEnv } from "vite";
import laravel from "laravel-vite-plugin";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { PrimeVueResolver } from "unplugin-vue-components/resolvers";
import { viteStaticCopy } from "vite-plugin-static-copy";

// https://vitejs.dev/config/
export default ({ mode }) => {
    const env = loadEnv(mode, process.cwd());
    const devPort = parseInt(env.VITE_PORT) || 5173;
    const hostDomain = env.VITE_HOST_DOMAIN || "localhost";
    const lightTheme = env.VITE_LIGHT_THEME || "aura-light-blue";
    const darkTheme = env.VITE_DARK_THEME || "aura-dark-blue";

    return defineConfig({
        plugins: [
            laravel({
                input: "resources/js/app.js",
                refresh: true,
            }),
            vue({
                template: {
                    transformAssetUrls: {
                        base: null,
                        includeAbsolute: false,
                    },
                },
            }),
            Components({
                resolvers: [PrimeVueResolver()],
            }),
            viteStaticCopy({
                targets: [
                    {
                        src: `node_modules/primevue/resources/themes/${lightTheme}`,
                        dest: "../themes",
                    },
                    {
                        src: `node_modules/primevue/resources/themes/${darkTheme}`,
                        dest: "../themes",
                    },
                ],
            }),
        ],
        server: {
            port: devPort,
            hmr: {
                host: hostDomain,
            },
            watch: {
                usePolling: true,
            },
        },
        preview: {
            port: devPort,
        },
    });
};
