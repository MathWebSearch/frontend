import 'isomorphic-fetch';
import {Ipayload, IMWSClientResult, IResponseType} from './client.d';
import {find_attribute_value} from '../util/simpleXpath';

/**
 * this should be the base class for all the backend queries
 * */
export abstract class Client {
  constructor(public url: string, public method: string = 'POST') {}

  async sendJson<T>(payload: Ipayload): Promise<T> {
    const data = {
      method: this.method,
      ...payload,
    };
    const response = await fetch(this.url, data);
    if (!response.ok) {
      throw new ResponseError(response);
    }

    return response.json();
  }
}

/*
 *  abstract class for searchquerys
 * */
export abstract class SearchClient<
  ResponseType extends IResponseType
> extends Client {
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

  abstract createPayload(
    content: string,
    answsize: number,
    limitmin: number,
  ): Ipayload;

  abstract unpackJson(json: ResponseType): IMWSClientResult;

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
      if (!json.from) {
        /* add the limitmin if it is not there */
        json.from = limitmin;
      }
    } catch (e) {
      console.log(`fetchContent in ${this.constructor.name} failed`, e);
      throw e;
    }
    return this.unpackJson(json);
  }
}

export class ResponseError implements Error {
  constructor(readonly response: Response) {}

  readonly name = 'ResponseError';
  readonly message = `Request to ${this.response.url} failed. `;

  /** indicates if the response returned the not found status */
  readonly isNotFound = this.response.status === 404;
}
