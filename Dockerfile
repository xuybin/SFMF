FROM node:lts-alpine

WORKDIR /app
COPY . tmp
RUN cd tmp && npm install &&  npm run package && cp -r .server ../ && cd .. && rm -rf tmp

CMD npm start