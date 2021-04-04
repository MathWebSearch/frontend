import {LTXClient} from './LTXClient';
import {MWSAPIClient, MWSClient} from './MWSClient';
import {MWS_MODE} from '../config';

const mwsclient = MWS_MODE === 'API' ? new MWSAPIClient() : new MWSClient();

const ltxclient = new LTXClient('/api/convert');

export {ltxclient, mwsclient};
