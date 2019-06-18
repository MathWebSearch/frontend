import React from 'react';
import MathML from './MathML';

function getFormula(htmlDoc, math_ids) {
  // console.log(htmlDoc, local_id);
  const local_id = math_ids.url;
  const xpath = math_ids.xpath;
  const math_tags = [
    ...(htmlDoc.getElementsByTagName('math') ||
      htmlDoc.getElementsByTagName('Math') ||
      htmlDoc.getElementsByTagName('Math')),
  ];
  const right = math_tags.find(e => e.getAttribute('local_id') === local_id);
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
    // const newMath = extractFormula(hits[i]);
    const newMath = getFormula(htmlDoc, hits[i].math_ids[0]);
    // allEntries[key]['formulas'].every(e => e.key !== newMath.key) &&
    allEntries[key]['formulas'].push(newMath);
  }
}
