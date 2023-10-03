FROM node:16.20.2

WORKDIR /app

COPY package.json /app
RUN npm install

COPY . ./

EXPOSE 8086

CMD ["node", "index.js"]