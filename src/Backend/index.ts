import {LTXClient} from './LTXClient';
import {MWSAPIClient, MWSClient} from './MWSClient';
import { MWS_MODE} from '../config';
import { LogClient } from './client';

const mwsclient = MWS_MODE === 'API' ? new MWSAPIClient() : new MWSClient();
const logClient  = new LogClient('/api/log');

const ltxclient = new LTXClient('/api/convert');

export {ltxclient, mwsclient, logClient};
