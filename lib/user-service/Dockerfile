FROM php:8.1-fpm

WORKDIR /app

COPY . /app

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN composer install

EXPOSE 8001

CMD php artisan serve --host=0.0.0.0 --port=8001