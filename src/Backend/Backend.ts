import 'babel-polyfill';
import 'isomorphic-fetch';
import {find_attribute_value} from '../util/simpleXpath';

const BACKEND_URL = '';

export function sendJson(method: string, path: string, payload: any) {
  const url = `${BACKEND_URL}${path}`;
  const data = {
    method: method,
    body: payload,
  };
  return fetch(url, data)
    .then(response => response.json())
    .catch(ex => {
      console.error(`sendJson failed on ${path}`, ex);
    });
}

export function extractQuery(math: string): string {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(math, 'text/xml');
  const node = find_attribute_value(xmlDoc, 'encoding', 'MWS-Query');
  if (node) {
    return node.innerHTML;
  }
  throw new Error('Did not found an MWS-Query element');
}
