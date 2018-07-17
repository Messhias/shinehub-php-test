FROM php:7.1-fpm

RUN apt-get update
RUN apt-get install -y zlib1g-dev \
    libjpeg-dev \
    libpng-dev \
    libfreetype6-dev


# Install Commons PHP Dependencies
RUN ACCEPT_EULA=Y apt-get install -y \
    unixodbc \
    unixodbc-dev \
    libgss3 \
    odbcinst \
    msodbcsql \
    locales \
    && echo "en_US.UTF-8 UTF-8" > /etc/locale.gen && locale-gen

RUN pecl install pdo_sqlsrv-4.1.8preview sqlsrv-4.1.8preview \
    && docker-php-ext-enable pdo_sqlsrv sqlsrv

RUN ln -s /usr/lib/x86_64-linux-gnu/libsybdb.a /usr/lib/

RUN docker-php-ext-install pdo_mysql
RUN docker-php-ext-install zip

RUN mkdir -p /code
ENV HOME=/code
WORKDIR $HOME

USER root
COPY ./ $HOME
