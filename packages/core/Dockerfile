FROM node:16-alpine

EXPOSE 8001
WORKDIR /code
COPY package*.json ./

RUN yarn install --production
COPY . .

ENV PORT=8001
CMD ["node", "dist/server.js"]