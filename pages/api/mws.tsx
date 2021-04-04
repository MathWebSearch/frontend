import { createProxyMiddleware } from "http-proxy-middleware";
import getConfig from 'next/config';

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true,
    },
}

const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();

const MWSAPI_URL = serverRuntimeConfig.REACT_APP_MWSAPI_URL || 'http://localhost:3001';
const MWS_URL = serverRuntimeConfig.REACT_APP_MWS_URL || 'http://localhost:9090';
const URL = publicRuntimeConfig.REACT_APP_MWS_MODE === 'API' ? MWSAPI_URL : MWS_URL;

console.log(`Forwarding /api/mws -> ${URL}`);


const proxy = createProxyMiddleware({
    logLevel: 'silent',
    target: URL,
    pathRewrite: {
        '^/api/mws': '/',
    }
})
export default proxy;