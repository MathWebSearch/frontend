import {Client} from './Client';

/*
 * this is the class to send the conversion queries to latexml
 * */

export class LTXClient extends Client {
  constructor(url: string) {
    super(url, 'POST');
  }

  createUrlParams(literal: string): URLSearchParams {
    const payload = new URLSearchParams();
    payload.append('profile', 'itex');
    payload.append('preload', 'mws.sty');
    payload.append('stylesheet', 'mwsq.xsl');
    payload.append('tex', `$${literal}$`);
    return payload;
  }
  async fetchContent(literal: string): Promise<string> {
    const payload = this.createUrlParams(literal);
    let json: JSON;
    try {
      json = await this.sendJson({body: payload});
    } catch (e) {
      console.log('fetchContent in LTXClient failed', e);
      throw e;
    }
    if (json['status_code']!== 0) {
      throw new Error(json['status']);
    }
    return json['result'];
  }
}
