FROM node:19-alpine

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

RUN npm run build

RUN rm -rf ./src nodemon.json Dockerfile tsconfig.json

CMD ["npm", "start"]
