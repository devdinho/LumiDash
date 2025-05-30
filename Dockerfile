FROM node:22

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
