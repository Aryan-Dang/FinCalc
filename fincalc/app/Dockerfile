FROM node:8-slim
RUN apt-get -y update && apt-get -y install bash python build-essential default-jre

RUN npm install -g node-gyp gulp knex pm2
RUN mkdir -p /opt/app

# use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:
WORKDIR /opt
ADD package.json /opt
RUN npm install && npm cache clean --force
ENV PATH /opt/node_modules/.bin:$PATH

# WORKDIR /opt/app
# ADD . /opt/app

EXPOSE 3000
EXPOSE 9229
