import 'babel-polyfill';
import 'isomorphic-fetch';
import {extractQuery} from './Backend';

export function mwsQuery(limitmin:number, answsize:number, math:string) {
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
  return fetch('/search', payload)
    .then(response => response.json())
    .catch(ex => {
      console.error('mwsQuery  Failed', ex);
    });
}
