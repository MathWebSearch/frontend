FROM node:12.6.0-alpine
WORKDIR /app
COPY . ./
ENV REACT_APP_MWS_MODE=API
ENV REACT_APP_LATEXML_URL=http://localhost:8080
ENV REACT_APP_MWSAPI_URL=http://localhost:3001
ENV REACT_APP_MWS_URL=http://localhost:9090
RUN npm install
EXPOSE "3000:3000"
CMD ["npm", "start"]
