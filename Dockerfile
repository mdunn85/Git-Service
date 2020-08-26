FROM node:12.18.3-alpine as builder

RUN mkdir /assets
WORKDIR /assests
COPY package.json /assets
COPY package-lock.json /assets
RUN npm install
COPY node_modules /assets

FROM node:12.18.3-alpine

RUN mkdir /app
WORKDIR /app
COPY ./ /app
COPY --from=builder /assets /app

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
