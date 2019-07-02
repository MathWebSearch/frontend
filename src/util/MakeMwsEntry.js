import React from 'react';
import {MathML} from '../components/MathML';
import {getElementBySimpleXpath} from './simpleXpath';

function getFormula(htmlDoc, math_ids) {
  const local_id = math_ids.url;
  const xpath = math_ids.xpath;
  // just in case
  const math_tags = [
    ...(htmlDoc.getElementsByTagName('math') ||
      htmlDoc.getElementsByTagName('m:math')),
  ];
  let right = math_tags.find(e => e.getAttribute('local_id') === local_id);
  let semantics = right.getElementsByTagName('m:semantics')[0];
  if (!semantics) {
    // this happens when the contentes of the math node are "text"
    const parser = new DOMParser();
    const newhtmlDoc = parser.parseFromString(right.textContent, 'text/html');
    right = newhtmlDoc.getElementsByTagName('math')[0];
    right = right ? right : newhtmlDoc.getElementsByTagName('m:math')[0];
    semantics = newhtmlDoc.getElementsByTagName('m:semantics')[0];
  }
  getElementBySimpleXpath(xpath, semantics);

  const url = right.getAttribute('url');
  return (
    <div className="Content" key={local_id.toString() + xpath}>
      <MathML mathstring={right.outerHTML} />
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={ev => {
          ev.stopPropagation();
          /*keeps it active even if clicked the link*/
        }}>
        Go to source
      </a>
    </div>
  );
}

export function MakeEntries(hits, allEntries) {
  const parser = new DOMParser();
  for (let i = 0; i < hits.length; i++) {
    const htmlDoc = parser.parseFromString(hits[i].xhtml, 'text/html');
    const id_tags = htmlDoc.getElementsByTagName('id');
    if (!id_tags || !id_tags.length) {
      // ignore all hits without an id tag
      console.log('hit without a id');
      continue;
    }
    const key = id_tags[0].innerHTML;
    if (!allEntries[key]) {
      const metadata = htmlDoc.getElementsByTagName('metadata')[0];
      const title = metadata && metadata.getElementsByTagName('title')[0]
        ? metadata.getElementsByTagName('title')[0].innerHTML
        : key;
      allEntries[key] = {
        key: key,
        title: title,
        active: false,
        formulas: [],
      };
    }
    // this prevents that the same formula appears two times in the list
    // at this point we don not use the xpath thing so there is no point in
    // showing the same formula twice
    const newMath = getFormula(htmlDoc, hits[i].math_ids[0]);
    // allEntries[key]['formulas'].every(e => e.key !== newMath.key) &&
    allEntries[key]['formulas'].push(newMath);
  }
}
