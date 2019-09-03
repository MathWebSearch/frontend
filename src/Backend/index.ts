import {LTXClient} from './LTXClient';
import {MWSClient, MWSAPIClient} from './MWSClient';

const mwsclient =
  process.env.REACT_APP_MWS_MODE === 'API'
    ? new MWSAPIClient('/mws/')
    : new MWSClient('/search');

const ltxclient = new LTXClient('/convert');

export {ltxclient, mwsclient};
