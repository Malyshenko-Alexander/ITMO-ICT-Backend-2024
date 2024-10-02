FROM node:18

WORKDIR /usr/src/user_auth_service

COPY package*.json ./

RUN npm install
RUN npm uninstall bcrypt
RUN npm install bcrypt

COPY . .

RUN npm run build

EXPOSE 3030

CMD [ "node", "dist/index.js" ]