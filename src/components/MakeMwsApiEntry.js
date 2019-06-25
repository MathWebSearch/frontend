import React from 'react';
import {MathML} from './MathML';

function extractUrl(source) {
  const parser = new DOMParser();
  const htmlDoc = parser.parseFromString(source, 'text/html');
  const url = htmlDoc.getElementsByTagName('math')[0].getAttribute('url');
  return url;
}

function createVars(subst) {
  if (!subst) {
    return;
  }
  return (
    <div>
      <b> Variables: </b>
      {Object.keys(subst).map(qvar => {
        return (
          <div key={qvar}>
            <b>{`${qvar}:`}</b>
            <MathML mathstring={subst[qvar]} />
          </div>
        );
      })}
    </div>
  );
}

function getFormula(hit) {
  // console.log(hit);
  const url = extractUrl(hit.source);
  const local_id = hit.url;
  const xpath = hit.xpath;

  return (
    <div className="Content" key={local_id.toString() + xpath}>
      <span>
        {'match: '}
        <MathML mathstring={hit.subterm} />
      </span>
      <span>
        {'source: '}
        <MathML mathstring={hit.source} />
      </span>
      {createVars(hit.subst)}
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
  for (let i = 0; i < hits.length; i++) {
    const key = hits[i].source.segment;
    // console.log(key);
    if (!allEntries[key]) {
      allEntries[key] = {
        key: key,
        title: key,
        active: false,
        formulas: [],
      };
    }
    const newMath = getFormula(hits[i].math_ids[0]);
    allEntries[key]['formulas'].push(newMath);
  }
}
