FROM node

WORKDIR /usr/src/app/client

COPY package*.json .

RUN npm install

WORKDIR /usr/src/app/client/src

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
