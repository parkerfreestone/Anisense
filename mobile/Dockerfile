FROM node:14-alpine

WORKDIR /app

COPY package.json ./

RUN npm install -g expo-cli &&\
    npm install

COPY . .

CMD ["npm", "start"]

EXPOSE 19000 19001 19002