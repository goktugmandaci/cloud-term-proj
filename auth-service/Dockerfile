FROM node:14

WORKDIR .

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 7070

CMD ["node", "index.js"]