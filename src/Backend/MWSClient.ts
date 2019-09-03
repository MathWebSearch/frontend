import {Client} from './Client';
import {find_attribute_value} from '../util/simpleXpath';
import {Ipayload} from './client';

export class MWSClient extends Client {
  constructor(url: string) {
    super(url, 'POST');
  }
  extractQuery(math: string): string {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(math, 'text/xml');
    const node = find_attribute_value(xmlDoc, 'encoding', 'MWS-Query');
    if (node) {
      return node.innerHTML;
    }
    throw new Error('Did not found an MWS-Query element');
  }

  createPayload(content: string, answsize: number, limitmin: number): Ipayload {
    return {
      body: `<mws:query xmlns:mws="http://www.mathweb.org/mws/ns"
        xmlns:m="http://www.w3.org/1998/Math/MathML"
        limitmin="${limitmin}"
        answsize="${answsize}"
        totalreq="yes"
        output="json" >
        <mws:expr>${content}</mws:expr>
        </mws:query>`,
    };
  }

  async fetchContent(math: string, answsize: number, limitmin: number = 0) {
    const content = this.extractQuery(math);
    const payload = this.createPayload(content, answsize, limitmin);
    let json: JSON;
    try {
      json = await this.sendJson(payload);
    } catch (e) {
      console.log('fetchContent in MWSClient failed', e);
      throw e;
    }
    return json;
  }
}

/**
 * class for interaction with MWSAPI
 * */
export class MWSAPIClient extends MWSClient {
  private header: Headers;
  constructor(url: string) {
    super(url);
    this.header = new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });
  }
  createPayload(content: string, answsize: number, limitmin: number): Ipayload {
    const body = {
      expressions: [content],
      from: limitmin,
      size: answsize,
    };
    return {
      headers: this.header,
      body: JSON.stringify(body),
    };
  }
}
