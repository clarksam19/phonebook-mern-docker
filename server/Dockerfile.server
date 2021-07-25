FROM node

WORKDIR /usr/src/app/server

COPY package*.json .

RUN npm install

WORKDIR /usr/src/app/server/src

COPY ./src .

EXPOSE 3001

CMD [ "npm", "run", "dev" ]
