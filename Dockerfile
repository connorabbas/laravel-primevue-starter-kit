ARG NODE_VERSION=22

# Base Image
# https://serversideup.net/open-source/docker-php/docs
FROM serversideup/php:8.4-fpm-nginx-alpine AS base
USER root
RUN install-php-extensions bcmath gd pdo_pgsql

# Install Composer packages
FROM base AS composer
WORKDIR /var/www/html
COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader --no-scripts --no-interaction

# Install and bundle NPM packages
FROM node:${NODE_VERSION}-alpine AS build-assets
WORKDIR /var/www/html
COPY package*.json ./
RUN npm ci
COPY vite.config.ts ./
COPY resources ./resources
RUN npm run build:ssr

# Development Image
FROM base AS development
ARG USER_ID=1000
ARG GROUP_ID=1000
USER root
RUN apk update \
    && apk add --no-cache curl git bash gnupg postgresql-client openssh-client ncurses nodejs npm \
    && apk add --no-cache --virtual .build-deps build-base autoconf \
    && install-php-extensions xdebug \
        bcmath \
        gd \
        intl \
        mysqli \
        pdo_mysql \
        curl \
        dom \
        fileinfo \
        filter \
        hash \
        mbstring \
        openssl \
        pcre \
        session \
        xml \
        redis \
        opcache \
        zip \
        exif \
    && rm -rf /var/cache/apk/* \
    && apk del --force-broken-world .build-deps
USER root
COPY .devcontainer/.bashrc /home/www-data/.bashrc
COPY .devcontainer/xdebug.ini /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini
RUN usermod -s /bin/bash www-data \
    && git config --global --add safe.directory /var/www/html \
    && mkdir -p /home/www-data/.ssh \
    && chown www-data:www-data /home/www-data/.ssh \
    && chown www-data:www-data /home/www-data/.bashrc \
    && docker-php-serversideup-set-id www-data $USER_ID:$GROUP_ID \
    && docker-php-serversideup-set-file-permissions --owner $USER_ID:$GROUP_ID --service nginx
WORKDIR /var/www/html
USER www-data

# Production Image
FROM base AS release
WORKDIR /var/www/html
COPY --chown=www-data:www-data --from=composer /var/www/html/vendor ./vendor
COPY --chown=www-data:www-data --from=build-assets /var/www/html/public/build ./public/build
COPY --chown=www-data:www-data . .
USER www-data

# SSR Production Image
FROM release AS ssr-release
USER root
RUN apk add --no-cache nodejs npm
COPY --chown=www-data:www-data --chmod=755 .s6-overlay/s6-rc.d /etc/s6-overlay/s6-rc.d
COPY --chown=www-data:www-data --from=build-assets /var/www/html/bootstrap/ssr ./bootstrap/ssr
USER www-data
