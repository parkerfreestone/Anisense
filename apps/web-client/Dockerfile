FROM node:14

# Set working directory
WORKDIR /app

# Copy existing application directory contents
COPY . /app

# Install dependencies
RUN npm install

# Start the app 
CMD ["npm", "start"]

EXPOSE 3000