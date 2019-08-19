import {sendJson} from './Backend';

export function latexmlQuery(literal) {
  const payload = new URLSearchParams();
  payload.append('profile', 'itex');
  payload.append('preload', 'mws.sty');
  payload.append('stylesheet', 'mwsq.xsl');
  payload.append('tex', `$${literal}$`);
  return sendJson('post', '/convert', payload);
}
