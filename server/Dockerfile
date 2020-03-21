# BASE image
FROM node:slim AS base

RUN apt-get update && apt-get install -y "wait-for-it"

# BUILDER image
FROM base AS builder

ENV NODE_ENV=development
WORKDIR /usr/src/covid-19-spain-server

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run lint
RUN npm run build

# DEVELOPMENT image
FROM builder AS development

COPY --from=builder /usr/src/covid-19-spain-server ./

ENV NODE_ENV=development
WORKDIR /usr/src/covid-19-spain-server

EXPOSE 3000

CMD ["npm", "run", "start:dev"]

# PRODUCTION image
FROM builder AS production

ENV NODE_ENV=production
WORKDIR /usr/src/covid-19-spain-server

COPY --from=builder /usr/src/covid-19-spain-server/package*.json ./
COPY --from=builder /usr/src/covid-19-spain-server/dist ./dist

RUN npm install

EXPOSE 80

CMD ["npm", "run", "start:prod"]
