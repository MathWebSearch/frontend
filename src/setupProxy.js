const proxy = require('http-proxy-middleware');
const LATEXML_URL = 'http://localhost:8080';
const MWSAPI_URL =  'http://localhost:3001';
module.exports = function(app){
    app.use(proxy('/convert', {target: LATEXML_URL}));
    app.use(proxy('/mws/', {target: MWSAPI_URL}));
}
