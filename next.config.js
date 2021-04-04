
module.exports = {
    serverRuntimeConfig: {
        REACT_APP_MWSAPI_URL: process.env.REACT_APP_MWSAPI_URL,
        REACT_APP_MWS_URL: process.env.REACT_APP_MWS_URL,
    },
    publicRuntimeConfig: {
        REACT_APP_MWS_MODE: process.env.REACT_APP_MWS_MODE,
        REACT_APP_LATEXML_URL: process.env.REACT_APP_LATEXML_URL,
        
        REACT_APP_MWS_BRANDING_TITLE: process.env.REACT_APP_MWS_BRANDING_TITLE,
        REACT_APP_MWS_BRANDING_URL: process.env.REACT_APP_MWS_BRANDING_URL,
        REACT_APP_DISABLE_EXAMPLES: process.env.REACT_APP_DISABLE_EXAMPLES,
        REACT_APP_DISABLE_SYMBOLS: process.env.REACT_APP_DISABLE_SYMBOLS,
        REACT_APP_THEME_NR: process.env.REACT_APP_THEME_NR,
    },
    future: {
        webpack5: true,
    }
}
