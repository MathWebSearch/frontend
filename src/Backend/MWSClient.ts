import {SearchClient} from './client';
import {
  Ipayload,
  IMWSClientResult,
  IMWSAPIResponse,
  IMWSResponse,
  IHit,
} from './client.d';
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

  /** parse response json into actual result data */
  unpackJson(json: IMWSResponse): IMWSClientResult {
    const queryvariablesxpath: Iqvar[] = json.qvars || [];

    const total = json.total;
    const from = json.from || 0;
    const hits = json.hits || [];
    const parser = new DOMParser();
    
    const entries = hits.map((hit: any, index: number): IFormulaHit | undefined => {
      if(hit.math_ids.length === 0) {
        console.log("No 'math_ids' returned from API");
        return undefined; // no math ids?
      }

      const local_id = hit.math_ids[0].url;
      const xpath = hit.math_ids[0].xpath;
  
      const xhtmldoc = parser.parseFromString(hit.xhtml, 'text/html');
      const title = xhtmldoc.title || '';

      const segment = Array.from(xhtmldoc.getElementsByTagName('id'))[0]?.textContent;
      if (!segment) {
        console.log("Missing <id> in harvest xml for: " + local_id);
        return undefined;
      }

      const math_node = find_attribute_value(xhtmldoc, 'local_id', local_id);
      if (!math_node) {
        console.log("Missing <math> element for: " + local_id);
        return undefined;
      }
      /** for the case that the actual math node is a string or not*/
      const source = math_node.innerHTML || math_node.textContent;
      if (!source) {
        console.log("Unable to extract source for: " + local_id);
        return undefined;
      }
      const url = extractUrl(source) || undefined;

      const text = xhtmldoc.getElementsByTagName('text')[0].textContent || '';

      return {
        id: index + from,
        local_id,
        segment,
        title,
        url,
        source,
        xpath,
        queryvariablesxpath,
        text,
      };
    }).filter(x => x !== undefined) as IFormulaHit[];

    return {total, entries, took: json.time/1e3};
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
    const hits = json.hits || [];
    const entries = hits.map((hit: IHit, index: number): IFormulaHit => {
      return {
        id: min + index,
        local_id: hit.math_ids[0].url,
        segment: hit.source.segment.replace(/\s+/, ' ').trim(),
        title: extractTitle(hit.source.metadata) || undefined,
        url: extractUrl(hit.math_ids[0].source) || "",
        source: hit.math_ids[0].source,
        subterm: hit.math_ids[0].subterm,
        xpath: hit.math_ids[0].xpath,
        substituitons: hit.math_ids[0].subst,
        queryvariablesxpath: qvars,
        text: hit.source.text,
      };
    });

    return {total: json.total, entries, took: json.took/1e9};
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
