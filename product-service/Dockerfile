FROM node:14

WORKDIR .

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD ["node", "index.js"]