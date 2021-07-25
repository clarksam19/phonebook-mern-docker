FROM node:16-alpine as client

WORKDIR /usr/app/client
COPY client/package*.json .
RUN npm install --only=production
COPY ./client .
RUN npm run build



FROM node:16-alpine

WORKDIR /usr/app
COPY --from=client /usr/app/client/build ./client/build

WORKDIR /usr/app/server
COPY server/package*.json .
RUN npm install --only=production
COPY ./server .

ENV PORT 8080

EXPOSE 8080

CMD ["npm", "start"]


