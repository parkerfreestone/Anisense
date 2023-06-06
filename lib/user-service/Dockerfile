FROM php:7.4-apache

# Install necessary packages and PHP extensions
RUN apt-get update && apt-get install -y \
    zlib1g-dev \
    libpng-dev \
    libxml2-dev \
    libzip-dev \
    libonig-dev \
    zip \
    curl \
    unzip \
    git \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip xml

# Enable Apache mod_rewrite
RUN a2enmod rewrite

# Copy application source
COPY . /var/www/html

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install dependencies
RUN composer install

# Modify permissions to make sure Laravel can write to necessary directories
RUN chown -R www-data:www-data \
        /var/www/html/storage \
        /var/www/html/bootstrap/cache

# Expose port 80 and start Apache service
EXPOSE 80
CMD ["apache2-foreground"]