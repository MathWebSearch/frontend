ARG REACT_APP_MWS_BRANDING_TITLE="nLab"
ARG REACT_APP_MWS_BRANDING_URL="https://ncatlab.org/nlab/show/HomePage"
ARG REACT_APP_THEME_NR=1
ARG REACT_APP_MWS_MODE=API

ARG REACT_APP_LATEXML_URL=http://localhost:8080
ARG REACT_APP_MWSAPI_URL=http://localhost:3001
ARG REACT_APP_MWS_URL=http://localhost:9090

ARG SYMBOLS_PATH=""
ARG EXAMPLE_PATH=""

### Dockerfile for MathHub-Frontend

# Start from nodejs
FROM node:15

# no telemetry please
ENV NEXT_TELEMETRY_DISABLED=1

# We will place all our code into /app/
WORKDIR /app/

# Add the dependency files first, then install them
# This will take advantage of caching if the deps did not
# change
ADD package.json /app/package.json
ADD yarn.lock /app/yarn.lock
RUN yarn --no-cache --frozen-lockfile install

# Add all the remaining source code
ADD pages /app/pages/
ADD src /app/src
ADD public /app/public

ADD . /app/

ENV REACT_APP_MWS_BRANDING_TITLE=${REACT_APP_MWS_BRANDING_TITLE}
ENV REACT_APP_MWS_BRANDING_URL=${REACT_APP_MWS_BRANDING_URL}
ENV REACT_APP_THEME_NR=${REACT_APP_THEME_NR}
ENV REACT_APP_MWS_MODE=${REACT_APP_MWS_MODE}

ENV REACT_APP_LATEXML_URL=${REACT_APP_LATEXML_URL}
ENV REACT_APP_MWSAPI_URL=${REACT_APP_MWSAPI_URL}
ENV REACT_APP_MWS_URL=${REACT_APP_MWS_URL}

RUN ["$SYMBOLS_PATH" == ""] || COPY $SYMBOLS_PATH /app/src/config/symbols.json
RUN ["$EXAMPLE_PATH" == ""] || COPY $SYMBOLS_PATH /app/src/config/examples.json

# Generate a distribution
RUN yarn mklegal && yarn build

# and set up the server
EXPOSE 3000
USER "www-data:www-data"
CMD [ "yarn", "start", "--port", "3000", "--hostname", "0.0.0.0" ]
