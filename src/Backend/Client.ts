/**
 * this should be the base class for all the backend queries
 * */
import 'isomorphic-fetch';
import {Ipayload} from './client.d';
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

export class ResponseError implements Error {
  constructor(readonly response: Response) {}

  readonly name = 'ResponseError';
  readonly message = `Request to ${this.response.url} failed. `;

  /** indicates if the response returned the not found status */
  readonly isNotFound = this.response.status === 404;
}
