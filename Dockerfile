FROM node:latest
#dockerfile for node app
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
COPY . .
RUN npm install

EXPOSE 3000
CMD [ "node", "index.js" ]
