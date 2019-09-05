import {Client} from './Client';
import {find_attribute_value} from '../util/simpleXpath';
import {
  Ipayload,
  IFormulaHit,
  Iqvar,
  IMWSClientResult,
  IMWSAPIResponse,
} from './client';
import {extractTitle, extractUrl} from '../util/extractFunctions';

export class MWSClient<ResponseType> extends Client {
  constructor(url: string = '/mws') {
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

  unpackJson(json: ResponseType): IMWSClientResult {
    throw new Error('not jet implemented');
  }

  async fetchContent(
    math: string,
    answsize: number,
    limitmin: number = 0,
  ): Promise<IMWSClientResult> {
    const content = this.extractQuery(math);
    const payload = this.createPayload(content, answsize, limitmin);
    let json: ResponseType;
    try {
      json = await this.sendJson(payload);
    } catch (e) {
      console.log(`fetchContent in ${this.constructor.name} failed`, e);
      throw e;
    }
    return this.unpackJson(json);
  }
}

/**
 * class for interaction with MWSAPI
 * */
export class MWSAPIClient extends MWSClient<IMWSAPIResponse> {
  private header: Headers;
  constructor(url: string = '/mws/') {
    super(url);
    this.header = new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });
  }

  unpackJson(json: IMWSAPIResponse): IMWSClientResult {
    const qvars: Iqvar[] = json.qvars || [];
    const min = json.from || 0;
    let ret: Array<IFormulaHit> = [];
    const hits = json.hits || [];
    hits.forEach((hit: any, index: number) => {
      ret.push({
        id: min + index,
        local_id: hit.math_ids[0].url,
        segment: hit.source.segment.replace(/\s+/, ' ').trim(),
        title: extractTitle(hit.source.metadata) || undefined,
        url: extractUrl(hit.math_ids[0].source),
        source: hit.math_ids[0].source,
        subterm: hit.math_ids[0].subterm,
        xpath: hit.math_ids[0].xpath,
        substituitons: hit.math_ids[0].subst,
        queryvariablesxpath: qvars,
        text: hit.source.text,
      });
    });

    return {total: json.total, entries: ret, took: json.took};
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
