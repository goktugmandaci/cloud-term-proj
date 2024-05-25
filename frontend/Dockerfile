FROM node:14-alpine as builder


WORKDIR /app


COPY package*.json ./


RUN npm install


COPY . .


RUN npm run build


FROM node:14-alpine


WORKDIR /app


COPY --from=builder /app/build ./build


RUN npm install -g serve


CMD ["serve", "-s", "build", "-l", "3000"]


EXPOSE 3000
