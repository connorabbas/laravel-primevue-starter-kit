ARG NODE_VERSION=22

# Base Image
# https://serversideup.net/open-source/docker-php/docs
FROM serversideup/php:8.4-fpm-nginx-alpine AS base
USER root
RUN install-php-extensions bcmath gd pgsql

# Node Image
FROM node:${NODE_VERSION}-alpine AS node

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
COPY --from=composer /var/www/html/vendor/tightenco/ziggy ./vendor/tightenco/ziggy
COPY vite.config.ts ./
COPY resources ./resources
RUN npm run build:ssr

# Development Image
FROM base AS development
ARG USER_ID=1000
ARG GROUP_ID=1000
USER root
RUN apk update \
    && apk add --no-cache curl git bash gnupg postgresql-client openssh-client ncurses \
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
COPY --from=node /usr/lib /usr/lib
COPY --from=node /usr/local/lib /usr/local/lib
COPY --from=node /usr/local/include /usr/local/include
COPY --from=node /usr/local/bin /usr/local/bin
# Optionally add OpenCode for agentic programming
#USER www-data
#RUN curl -fsSL https://opencode.ai/install | bash
#ENV PATH="/home/www-data/.opencode/bin:$PATH"
#USER root
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
FROM base AS ssr-release
COPY --from=node /usr/lib /usr/lib
COPY --from=node /usr/local/lib /usr/local/lib
COPY --from=node /usr/local/include /usr/local/include
COPY --from=node /usr/local/bin /usr/local/bin
COPY --chown=www-data:www-data --chmod=755 .infrastructure/s6-overlay/inertia-ssr /etc/s6-overlay/s6-rc.d/inertia-ssr
RUN touch /etc/s6-overlay/s6-rc.d/user/contents.d/inertia-ssr \
    && chown www-data:www-data /etc/s6-overlay/s6-rc.d/user/contents.d/inertia-ssr \
    && chmod 755 /etc/s6-overlay/s6-rc.d/user/contents.d/inertia-ssr
WORKDIR /var/www/html
COPY --chown=www-data:www-data --from=composer /var/www/html/vendor ./vendor
COPY --chown=www-data:www-data --from=build-assets /var/www/html/public/build ./public/build
COPY --chown=www-data:www-data --from=build-assets /var/www/html/bootstrap/ssr ./bootstrap/ssr
COPY --chown=www-data:www-data . .
USER www-data
