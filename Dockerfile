FROM node
WORKDIR /usr/src/app

COPY package.json /usr/src/app/package.json
COPY package-lock.json /usr/src/app/package-lock.json


COPY . /usr/src/app

RUN npm install
RUN cd /usr/src/app/Frontend/ && npm install && npm run build

EXPOSE 9000
EXPOSE 80

ENTRYPOINT [ "npm", "start" ]