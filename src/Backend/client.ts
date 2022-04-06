import {Ipayload, IMWSClientResult, IResponseType} from './client.d';
import {find_attribute_value} from '../util/simpleXpath';
import {errorLog} from '../config';
import DOMParser from "../util/DOMParser";

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
 * Class for logging queries
 */
export class LogClient extends Client {
  constructor(url: string) {
    super(url, 'POST');
  }

  async logQuery(input_text: string, status: string) {
    // Simple way for developers to disable logging from their browsers.
    if (localStorage.getItem("disable_logging")) return;

    if (!this.url) return;
    try {
      await this.sendJson({
        body: JSON.stringify(
        {
          query: input_text,
          status: status
        })
      });
    } catch (e) {
      errorLog(`fetchContent in ${this.constructor.name} failed`, e);
      throw e;
    }
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
      errorLog(`fetchContent in ${this.constructor.name} failed`, e);
      throw e;
    }
    return this.unpackJson(json);
  }
}

export class ResponseError implements Error {
  constructor(readonly response: Response) {
    this.message = `Request to ${this.response.url} failed. `;
    this.isNotFound = this.response.status === 404;
  }

  readonly name = 'ResponseError';
  readonly message: string;
  /** indicates if the response returned the not found status */
  readonly isNotFound: boolean;

}
