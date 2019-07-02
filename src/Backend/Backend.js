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
  const semantics = xmlDoc.getElementsByTagName('semantics')[0];
  const annotations = Array.from(
    semantics.getElementsByTagName('annotation-xml'),
  );
  annotations.filter(
    annotation => annotation.getAttribute('encoding') === 'MWS-Query',
  );
  // TODO: think about this
  // look for an mws-Query encoded annotation, otherwise send the fist child
  // of the semantics
  if (annotations.length !== 0) {
    return annotations[0].innerHTML;
  }

  return semantics.firstElementChild.outerHTML;
}
