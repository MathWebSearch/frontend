import { SearchClient } from './client';
import {
  Ipayload,
  IMWSClientResult,
  IMWSAPIResponse,
  IMWSResponse,
  IHit,
} from './client.d';
import { IFormulaHit, Iqvar } from '../interfaces.d';
import { extractTitle, extractUrl, extractMathId } from '../util/extractFunctions';
import { find_attribute_value } from '../util/simpleXpath';
import DOMParser from "../util/DOMParser";

function htmlDecode(input: string) {
  var doc = new DOMParser().parseFromString(input, "text/html");
  return doc?.documentElement?.textContent || input;
}

function getAr5Link(segment: string) {
  if (!segment)  return null;
  const arxivPattern = /\/([0-9]+\.[0-9]+)\.html$/
  const result = arxivPattern.exec(segment)
  if (!result?.[1]) return null;
  return "https://ar5iv.org/abs/" + result[1]
}

function titleFromText(text: string) {
  const firstSection = text.substring(0, 300)
  const words = firstSection.split(' ');
  let numTitleWords = -1
  for (const [idx, word] of words.entries()) {
    if (idx > 0 && word == words[0]) {
      numTitleWords = idx;
      break
    }
  }
  return (numTitleWords == -1) ? firstSection : words.slice(0, numTitleWords).join(' ');
}

function extractUrlFromSegment(source: string, segment: string) {
  const documentlink = getAr5Link(segment);
  if (!documentlink) return;
  const math_id = extractMathId(source) || '';

  return documentlink + '#' + math_id;
}
/*
 * class for directly communicating with an mws instance
 * */
export class MWSClient extends SearchClient<IMWSResponse> {
  constructor(url: string = '/api/mws') {
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
      if (hit.math_ids.length === 0) {
        console.log("No 'math_ids' returned from API");
        return undefined; // no math ids?
      }

      const local_id = hit.math_ids[0].url;
      const xpath = hit.math_ids[0].xpath;

      const xhtmldoc = parser.parseFromString(hit.xhtml, 'text/html');

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
      const source_raw = math_node.innerHTML || math_node.textContent;
      if (!source_raw) {
        console.log("Unable to extract source for: " + local_id);
        return undefined;
      }
      const source = htmlDecode(source_raw);
      const url = extractUrl(source) || extractUrlFromSegment(source, segment) || undefined;

      const text = xhtmldoc.getElementsByTagName('text')[0].textContent || '';

      const title = xhtmldoc.title || titleFromText(text) || '';

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

    return { total, entries, took: json.time / 1e3 };
  }
}

/**
 * class for interaction with MWSAPI
 * */
export class MWSAPIClient extends SearchClient<IMWSAPIResponse> {
  private header: Headers;
  constructor(url: string = '/api/mws/') {
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

    return { total: json.total, entries, took: json.took / 1e9 };
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
