import {SearchClient} from './Client';
import {
  Ipayload,
  IMWSClientResult,
  IMWSAPIResponse,
  IMWSResponse,
  IHit,
} from './client';
import {IFormulaHit, Iqvar} from '../interfaces.d';
import {extractTitle, extractUrl} from '../util/extractFunctions';
import {find_attribute_value} from '../util/simpleXpath';

/*
 * class for directly communicating with an mws instance
 * */
export class MWSClient extends SearchClient<IMWSResponse> {
  constructor(url: string = '/mws') {
    super(url);
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

  unpackJson(json: IMWSResponse): IMWSClientResult {
    const qvars: Iqvar[] = json.qvars || [];
    const from = json.from || 0;
    let ret: Array<IFormulaHit> = [];
    const hits = json.hits || [];
    const parser = new DOMParser();
    hits.forEach((hit: any, index: number) => {
      const local_id = hit.math_ids[0].url;
      const xhtmldoc = parser.parseFromString(hit.xhtml, 'text/html');
      const ids = xhtmldoc.getElementsByTagName('id');
      if (!ids[0].textContent) {
        /*lets assume if there is the id missing then it's useless to go on*/
        return;
      }
      const math_node = find_attribute_value(xhtmldoc, 'local_id', local_id);
      /** for the case that the actual math node is a string or not*/
      const source = math_node.textContent || math_node.innerHTML;
      if (!source) {
        /* if no source then it is useless to go on*/
        return;
      }
      ret.push({
        id: index + from,
        local_id,
        segment: ids[0].textContent,
        title: xhtmldoc.title || '',
        url: extractUrl(source) || undefined,
        source,
        xpath: hit.math_ids[0].xpath,
        queryvariablesxpath: qvars,
        text: xhtmldoc.getElementsByTagName('text')[0].textContent || '',
      });
    });

    return {total: json.total, entries: ret, took: json.time/1e6};
  }
}

/**
 * class for interaction with MWSAPI
 * */
export class MWSAPIClient extends SearchClient<IMWSAPIResponse> {
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
    hits.forEach((hit: IHit, index: number) => {
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

    return {total: json.total, entries: ret, took: json.took/1e9};
  }

  createPayload(content: string, answsize: number, limitmin: number): Ipayload {
    const body = {
      expressions: [content],
      from: limitmin,
      size: answsize,
      complete: false,
    };
    return {
      headers: this.header,
      body: JSON.stringify(body),
    };
  }
}
