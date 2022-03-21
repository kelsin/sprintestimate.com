FROM node:16.14.2-alpine AS client

# Environment setup
ENV NODE_ENV=production
RUN mkdir -p /app/client

WORKDIR /app/
COPY client/package.json /app/client/
COPY package.json /app/
COPY yarn.lock /app/
RUN yarn

WORKDIR /app/client/
COPY client /app/client/
RUN yarn build

FROM node:16.14.2-alpine AS server

# Environment setup
WORKDIR /app/
COPY server/package.json /app/server/
COPY package.json /app/
COPY yarn.lock /app/
RUN yarn

# Copy in client
COPY --from=client /app/client/build /app/client/build

# Copy in the server
WORKDIR /app/server/
COPY server /app/server/
CMD ["yarn", "start"]
