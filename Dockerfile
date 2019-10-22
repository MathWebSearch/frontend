
FROM node:12.6.0-alpine AS builder
WORKDIR /app
COPY . ./

ARG SYMBOLS_PATH=""
ARG EXAMPLE_PATH=""

# copy the example/ symbols json if it is provided
RUN ["$SYMBOLS_PATH" == ""] || COPY $SYMBOLS_PATH ./src/config/symbols.json
RUN ["$EXAMPLE_PATH" == ""] || COPY $SYMBOLS_PATH ./src/config/examples.json

ARG REACT_APP_MWS_BRANDING_TITLE="nLab"
ARG REACT_APP_MWS_BRANDING_URL="https://ncatlab.org/nlab/show/HomePage"
ARG REACT_APP_MWS_MODE=API

ENV REACT_APP_LATEXML_URL=http://localhost:8080
ENV REACT_APP_MWSAPI_URL=http://localhost:3001
ENV REACT_APP_MWS_URL=http://localhost:9090
ENV REACT_APP_THEME_NR=1
RUN yarn && yarn build

FROM node:12.6.0-alpine
ENV NODE_PORT=3000
WORKDIR /app
RUN mkdir -p /app/src
RUN mkdir -p /app/build
COPY --from=builder /app/build /app/build
RUN npm install express http-proxy-middleware
COPY ./express.js .
COPY ./src/setupProxy.js ./src/

CMD ["node", "express.js"]
EXPOSE $NODE_PORT
