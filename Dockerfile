ARG PHP_VERSION=8.4
ARG NODE_VERSION=22

# ==========================================
# Base Image (Alpine)
# ==========================================
FROM serversideup/php:${PHP_VERSION}-fpm-nginx-alpine AS base
USER root
RUN apk update && apk upgrade --no-cache \
    && install-php-extensions \
        bcmath \
        gd \
        intl \
        opcache \
        pdo_pgsql \
        redis \
        zip \
    && rm -rf /var/cache/apk/*

# ==========================================
# Install Composer Packages
# ==========================================
FROM base AS composer
WORKDIR /var/www/html
COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader --no-scripts --no-interaction

# ==========================================
# Install and Bundle NPM Packages
# ==========================================
FROM node:${NODE_VERSION}-alpine AS build-assets
WORKDIR /var/www/html
COPY package*.json ./
RUN npm ci
COPY vite.config.ts ./
COPY resources ./resources
RUN npm run build:ssr

# ==========================================
# Production Release Image (No SSR)
# ==========================================
FROM base AS release
WORKDIR /var/www/html
COPY --chown=www-data:www-data --from=composer /var/www/html/vendor ./vendor
COPY --chown=www-data:www-data --from=build-assets /var/www/html/public/build ./public/build
COPY --chown=www-data:www-data . .
RUN composer dump-autoload --no-dev --optimize
USER www-data

# ==========================================
# SSR Production Release Image
# ==========================================
FROM release AS ssr-release
USER root
RUN apk add --no-cache libstdc++ libgcc
COPY --from=build-assets /usr/local/bin/node /usr/local/bin/node
COPY --chown=www-data:www-data --chmod=755 .s6-overlay/s6-rc.d /etc/s6-overlay/s6-rc.d
COPY --chown=www-data:www-data --from=build-assets /var/www/html/bootstrap/ssr ./bootstrap/ssr
USER www-data
