FROM node:10.13-alpine
WORKDIR /usr/src/app
COPY . .
RUN  npm install --unsafe-perm

RUN npm run build
RUN npm run lint
RUN npm run test
