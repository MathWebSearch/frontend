/**
 * In this file all the environment is read and exported
 **/
import examplejson from './examples.json';
import symboljson from './symbols.json';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const config = publicRuntimeConfig ?? {};

/**
 * check if a botton is disabled it can only be disabled with 'true'
 * */
export const examples =
  !config.REACT_APP_DISABLE_EXAMPLES ||
  config.REACT_APP_DISABLE_EXAMPLES !== 'true'
    ? examplejson.exampleList
    : null;
export const symbols =
  !config.REACT_APP_DISABLE_SYMBOLS ||
  config.REACT_APP_DISABLE_SYMBOLS !== 'true'
    ? symboljson.symbolList
    : null;

export const BRANDING_TITLE = config.REACT_APP_MWS_BRANDING_TITLE || 'nLab';
export const FOOTER_TEXT = config.REACT_APP_MWS_FOOTER_TEXT || '';
export const BRANDING_URL = config.REACT_APP_MWS_BRANDING_URL || 'https://ncatlab.org/nlab/show/HomePage';

export const MWS_MODE = config.REACT_APP_MWS_MODE === 'API' ? 'API' : 'MWS';

const THEME_NRS = ["1", "2", "3"];
export const THEME_NUMBER = (
  (value: string | undefined) => THEME_NRS.indexOf(value!) >= 0 ? value : THEME_NRS[0]
)(config.REACT_APP_THEME_NR);

export const errorLog = config.NODE_ENV !== 'production' ? console.error.bind(console) : () => {};
