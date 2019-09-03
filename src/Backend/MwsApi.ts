import 'babel-polyfill';
import 'isomorphic-fetch';
import {extractQuery} from './Backend';

export function mwsApiQuery(limitmin :number, answsize:number, math:string) {
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
  return fetch('/mws/', payload)
    .then(response => {
      // console.log(response);
      if (response.status !== 200) {
        throw new Error(response['statusText']);
      }
      return response.json();
    })
    .catch(ex => {
      console.error('mwsApiQuery Failed', ex);
    });
}
