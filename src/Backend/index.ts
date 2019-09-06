import {LTXClient} from './LTXClient';
import {MWSAPIClient, MWSClient} from './MWSClient';

const mwsclient =
  process.env.REACT_APP_MWS_MODE === 'API'
    ? new MWSAPIClient()
    : new MWSClient();

const ltxclient = new LTXClient('/convert');

export {ltxclient, mwsclient};
