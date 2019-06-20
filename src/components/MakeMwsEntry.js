import React from 'react';
import {MathML} from './MathML';

function getElementBySimpleXpath(xpath, element) {
  // this is stolen from the old frontend
  let xpatharr = xpath
    .split('/')
    .join('')
    .split('[')
    .join('')
    .split(']')
    .join('')
    .split('*');
  xpatharr.shift();
  xpatharr = xpatharr.map(function(e) {
    return parseInt(e) - 1; //xpatharr is one-based
  });
  let elem = element;
  while (xpatharr.length > 0) {
    let n = xpatharr.shift();
    elem = elem.children[n];
  }
  const xmlID = elem.getAttribute('xml:id');
  const pmml = element.getElementsByTagName('m:annotation-xml')[0];
  const node = Array.from(pmml.getElementsByTagName('*')).find(e => {
    return e.getAttribute('xref') === xmlID;
  });
  node.setAttribute('class', 'Highlighted');
}

function getFormula(htmlDoc, math_ids) {
  const local_id = math_ids.url;
  const xpath = math_ids.xpath;
  // just in case
  const math_tags = [
    ...(htmlDoc.getElementsByTagName('math') ||
      htmlDoc.getElementsByTagName('Math') ||
      htmlDoc.getElementsByTagName('m:math')),
  ];
  const right = math_tags.find(e => e.getAttribute('local_id') === local_id);
  getElementBySimpleXpath(xpath, right.getElementsByTagName('m:semantics')[0]);

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
        Go to nLab
      </a>
    </div>
  );
}
export function MakeEntries(hits, allEntries) {
  for (let i = 0; i < hits.length; i++) {
    const parser = new DOMParser();
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
      const title = metadata.getElementsByTagName('title')[0].innerHTML;
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
