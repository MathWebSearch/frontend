import { createProxyMiddleware } from "http-proxy-middleware";
import getConfig from 'next/config';

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true,
    },
}

const { serverRuntimeConfig } = getConfig();

const URL = serverRuntimeConfig.REACT_APP_LATEXML_URL || 'http://localhost:8080';
console.log(`Forwarding /api/convert -> ${URL}/convert`);

const proxy = createProxyMiddleware({
    logLevel: 'silent',
    target: URL,
    pathRewrite: {
        '^/api/convert': '/convert',
    }
})
export default proxy;