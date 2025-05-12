FROM node:21-alpine

WORKDIR /app

COPY package*.json .

RUN npm install

COPY nodemon.json .
COPY src/ src/  
EXPOSE 3000
CMD ["npx", "nodemon"]