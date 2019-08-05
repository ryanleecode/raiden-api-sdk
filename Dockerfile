FROM node:10.13-alpine
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN  npm install --unsafe-perm
COPY . .

RUN npm run build
RUN npm run lint
RUN npm run test
