FROM node:21

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

# running Nightwatch tests
CMD ["npx", "nightwatch", "tests/loginPageTest.js", "--chrome", "env"]
