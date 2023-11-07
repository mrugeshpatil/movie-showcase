# use your choice of build tool and version 
FROM node:18-alpine as BUILD_IMAGE

# build configuration
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

# implementing multi-satge build for optimization and security
FROM node:18-alpine as PRODUCTION_IMAGE
WORKDIR /app

COPY --from=BUILD_IMAGE /app/dist/ /app/dist/

EXPOSE 8080
COPY package.json  .
COPY vite.config.ts .

RUN npm install typescript
EXPOSE 8080

CMD [ "npm", "run", "preview" ]
