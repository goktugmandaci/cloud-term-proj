FROM node:14


WORKDIR .


COPY package.json package-lock.json ./


RUN npm install


COPY . .


EXPOSE 9090


CMD ["node", "index.js"]