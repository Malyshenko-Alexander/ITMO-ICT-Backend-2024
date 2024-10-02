FROM node:18

WORKDIR /usr/src/user_info_service

COPY package*.json ./

RUN npm install
RUN npm uninstall bcrypt
RUN npm install bcrypt

COPY . .

RUN npm run build

EXPOSE 9595

CMD [ "node", "dist/index.js" ]