import 'babel-polyfill';
import 'isomorphic-fetch';

const BACKEND_URL = '';

function sendJson(method, path, payload) {
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

function extractQuery(math) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(math, 'text/xml');
  return xmlDoc.getElementsByTagName('semantics')[0].firstElementChild
    .outerHTML;
}

export function mwsQuery(limitmin, answsize, math) {
  const content = extractQuery(math);
  const query = `<mws:query xmlns:mws="http://www.mathweb.org/mws/ns"
        xmlns:m="http://www.w3.org/1998/Math/MathML"
        limitmin="${limitmin}"
        answsize="${answsize}"
        totalreq="yes"
        output="json" >
        <mws:expr>${content}</mws:expr>
        </mws:query>`;
  const payload = {
    method: 'POST',
    body: query,
  };
  return fetch('/', payload)
    .then(response => response.json())
    .catch(ex => {
      console.error('mwsQuery  Failed', ex);
    });
}

export function latexmlQuery(literal) {
  const payload = new URLSearchParams();
  payload.append('profile', 'itex');
  payload.append('preload', 'mws.sty');
  payload.append('stylesheet', 'mwsq.xsl');
  payload.append('tex', literal);
  return sendJson('post', '/convert', payload);
}

export function mwsApiQuery(limitmin, answsize, math) {
  const content = extractQuery(math);
  const header = new Headers({
    Accept: 'application/json',
    'Content-Type': 'application/json',
  });
  const body = {
    expressions: [content],
    from: limitmin,
    size: answsize,
  };
  const payload = {
    method: 'POST',
    headers: header,
    body: JSON.stringify(body),
  };
  console.log(payload);
  return fetch('/mws', payload)
    .then(response => response.json())
    .catch(ex => {
      console.error('mwsApiQuery Failed', ex);
    });
}
