# BASE image
FROM node:slim AS base

# BUILDER image
FROM base AS builder

WORKDIR /usr/src/covid-19-spain-frontend

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# DEVELOPMENT image
FROM builder AS development

WORKDIR /usr/src/covid-19-spain-frontend

COPY --from=builder /usr/src/covid-19-spain-frontend ./

EXPOSE 4200

CMD ["npm", "run", "start:dev"]

# PRODUCTION image
FROM builder AS production

WORKDIR /usr/src/covid-19-spain-frontend

COPY --from=builder /usr/src/covid-19-spain-frontend ./

EXPOSE 80

CMD ["npm", "run", "start:prod"]
