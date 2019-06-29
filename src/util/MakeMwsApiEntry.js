import React from 'react';
import {MathML} from '../components/MathML';
import {getElementBySimpleXpath} from './simpleXpath';

function extractUrl(source) {
  const parser = new DOMParser();
  const htmlDoc = parser.parseFromString(source, 'text/html');
  let math = htmlDoc.getElementsByTagName('math');
  if (0 === math.length) {
    math = htmlDoc.getElementsByTagName('m:math');
  }
  htmlDoc.getElementsByTagName('m:math');
  const url = math[0].getAttribute('url');
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
            <span>
              <b style={{color: 'red'}}>{`${qvar}:`}</b>
              <MathML mathstring={subst[qvar]} />
            </span>
          </div>
        );
      })}
    </div>
  );
}

function highlightFormula(source, xpath) {
  const parser = new DOMParser();
  const htmlDoc = parser.parseFromString(source, 'text/html');
  try {
    let semantics = htmlDoc.getElementsByTagName('m:semantics')[0];
    if (!semantics) {
      semantics = htmlDoc.getElementsByTagName('semantics')[0];
    }
    getElementBySimpleXpath(xpath, semantics);
    return htmlDoc.activeElement.innerHTML;
  } catch {
    console.log('no highlightFormula');
    return source;
  }
}

function getFormula(hit) {
  // console.log(hit);
  const url = extractUrl(hit.source);
  const local_id = hit.url;
  const xpath = hit.xpath;
  const source = highlightFormula(hit.source, xpath);
  // console.log(hit);

  return (
    <div className="Content" key={local_id.toString() + xpath}>
      <span>
        {'match: '}
        <MathML mathstring={hit.subterm} />
      </span>
      <span>
        {'source: '}
        <MathML mathstring={source} />
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
