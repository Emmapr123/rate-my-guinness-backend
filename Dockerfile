FROM node:18.5.0-alpine
ENV NODE_VERSION production
COPY docker/fonts /usr/share/fonts
RUN apk add --no-cache fontconfig
WORKDIR /app
ARG NPM_TOKEN
#COPY .npmrc ./
# RUN echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > ./.npmrc
COPY package.json ./
RUN yarn install
COPY dist ./dist
COPY bin ./bin
# CMD node dist/main.js
CMD bin/startup.sh