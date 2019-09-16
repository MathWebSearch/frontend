const proxy = require('http-proxy-middleware');
const LATEXML_URL =
  !process.env.REACT_APP_LATEXML_URL
    ? 'http://localhost:8080'
    : process.env.REACT_APP_LATEXML_URL;
const MWSAPI_URL =
  !process.env.REACT_APP_MWSAPI_URL
    ? 'http://localhost:3001'
    : process.env.REACT_APP_MWSAPI_URL;
const MWS_URL =
  !process.env.REACT_APP_MWS_URL
    ? 'http://localhost:9090'
    : process.env.REACT_APP_MWS_URL;

const mode = process.env.REACT_APP_MWS_MODE === 'API';

module.exports = function(app) {
  app.use(proxy('/convert', {target: LATEXML_URL}));
  app.use(proxy('/mws', {target: mode ? MWSAPI_URL: MWS_URL}));
};
