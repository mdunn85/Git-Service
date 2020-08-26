FROM node:12.18.3-alpine

RUN mkdir /app
WORKDIR /app
COPY ./ /app
RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
