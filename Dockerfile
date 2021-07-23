FROM node

WORKDIR /usr/src

COPY package*.json .

RUN npm install

WORKDIR /usr/src/app

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
