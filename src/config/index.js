/**
 * In this file all the environment is read and exported
 **/
import {exampleList} from './examples';
import {symbolList} from './symbols';

/**
 * check if a botton is disabled it can only be disabled with 'true'
 * */
export const examples =
  !process.env.REACT_APP_DISABLE_EXAMPLES ||
  process.env.REACT_APP_DISABLE_EXAMPLES !== 'true'
    ? exampleList
    : null;
export const symbols = !process.env.REACT_APP_DISABLE_SYMBOLS
  || process.env.REACT_APP_DISABLE_SYMBOLS !== 'true'
  ? symbolList
  : null;

export const BRANDING_TITLE =
  process.env.REACT_APP_MWS_BRANDING_TITLE || 'nLab';
export const BRANDING_URL =
  process.env.REACT_APP_MWS_BRANDING_URL ||
  'https://ncatlab.org/nlab/show/HomePage';

export const MWS_MODE =
  process.env.REACT_APP_MWS_MODE === 'API' ? 'API' : 'MWS';
