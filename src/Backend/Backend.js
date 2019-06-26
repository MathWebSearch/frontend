import 'babel-polyfill';
import 'isomorphic-fetch';

const BACKEND_URL = '';

export function sendJson(method, path, payload) {
  const url = `${BACKEND_URL}${path}`;
  const data = {
    method: method,
    body: payload,
  };
  return fetch(url, data)
    .then(response => response.json())
    .catch(ex => {
      console.error('sendJson failed', ex);
    });
}

export function extractQuery(math) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(math, 'text/xml');
  return xmlDoc.getElementsByTagName('semantics')[0].firstElementChild
    .outerHTML;
}
