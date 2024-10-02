FROM node:18

WORKDIR /usr/src/monolith

COPY package*.json ./

RUN npm install
RUN npm uninstall bcrypt
RUN npm install bcrypt

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "node", "dist/index.js" ]