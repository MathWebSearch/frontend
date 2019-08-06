import React from 'react';
import {MathML} from '../components/MathML';
import '../css/ApiEntry.css';
import {colors} from './Colors.js';
// import {convertXpath, getElementBySimpleXpath} from './simpleXpath';

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

function extractTitle(metastring) {
  // console.log(metastring);
  const parser = new DOMParser();
  const htmlDoc = parser.parseFromString(metastring, 'text/html');
  try {
    const title = htmlDoc.getElementsByTagName('title')[0].innerText;
    return title;
  } catch {
    return null;
  }
}

function extractSurroundingWords(text, mathid) {
  const textsplit = text.split(' ').filter(e => e !== '');
  const index = textsplit.findIndex(e => e.match(new RegExp(`.*${mathid}.*`)));
  if (-1 === index) {
    return {};
  }
  let before = [];
  let after = [];
  for (let i = 1; i < 10 && i; i++) {
    if (index + i >= textsplit.length) {
      break;
    }
    const word = textsplit[index + i];
    if (word.match(/math\d+/)) {
      break;
    }
    after.push(word);
    after.push(' ');
  }
  for (let i = 1; i < 10; i++) {
    if (index - i < 0) {
      break;
    }
    const word = textsplit[index - i];
    if (word.match(/math\d+/)) {
      break;
    }
    before.push(word);
    before.push(' ');
  }
  return {before: before.reverse(), after: after};
}

function createVars(subst) {
  if (!subst) {
    return;
  }
  return (
    <div className="FlexContainer">
      <b> Subsitutions: </b>
      {Object.keys(subst).map((qvar, index) => {
        return (
          <div key={qvar}>
            <span
              style={{color: colors[index % colors.length]}}
              className="FlexContainer">
              <b>{`${qvar}:`}</b>
              <MathML mathstring={subst[qvar]} />
            </span>
          </div>
        );
      })}
    </div>
  );
}

function extractXMLID(subterm) {
  // TODO: error handling
  const parser = new DOMParser();
  const subtermDoc = parser.parseFromString(subterm, 'text/html');
  const semantics = subtermDoc.getElementsByTagName('m:semantics')[0];
  const xmlID = semantics.firstElementChild.getAttribute('xml:id');
  return xmlID;
}

function colorQvars(qvars, sourceDoc) {
  if (!qvars) {
    return;
  }
  Object.keys(qvars).forEach((qvar, index) => {
    const xmlID = extractXMLID(qvars[qvar]);
    // console.log(xmlID);
    const node = Array.from(sourceDoc.getElementsByTagName('*')).find(e => {
      return e.getAttribute('xml:id') === xmlID;
    });
    if (node) {
      // console.log(node);
      node.setAttribute('mathcolor', colors[index % colors.length]);
    }
  });
}

function highlightFormula(source, subterm, qvars) {
  // new way to highlight the right part of subterm:
  // find the xmlid of the subterm and look for that xmlid in the source and
  // highlight it

  try {
    const xmlID = extractXMLID(subterm);
    const parser = new DOMParser();
    const sourceDoc = parser.parseFromString(source, 'text/html');
    const node = Array.from(sourceDoc.getElementsByTagName('*')).find(e => {
      return e.getAttribute('xml:id') === xmlID;
    });
    if (node) {
      node.setAttribute('class', 'Highlighted');
    }
    // color the qvars in a color
    colorQvars(qvars, sourceDoc);
    return sourceDoc.activeElement.innerHTML;
  } catch {
    console.log('no highlighting possible');
    return source;
  }
}

function getFormula(hit, text) {
  const url = extractUrl(hit.source);
  const local_id = hit.url;
  const xpath = hit.xpath;
  const source = highlightFormula(hit.source, hit.subterm, hit.subst);
  const context = extractSurroundingWords(text, `math${local_id}`);
  // console.log(context);
  return (
    <div className="Content" key={local_id.toString() + xpath}>
      <span className="FlexContainer">
        <div> {context.before}</div>
        <MathML mathstring={source} />
        <div> {context.after} </div>
      </span>
      {/*<span className="FlexContainer">
        <b className="Flex1">{'match : '}</b>
        <MathML mathstring={hit.subterm} />
      </span>*/}
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

export function MakeEntries(hits, allEntries, aggregate = 'segment') {
  for (let i = 0; i < hits.length; i++) {
    const local_id = hits[i].math_ids[0].url;
    const key =
      '' === aggregate
        ? hits[i].source.segment + local_id
        : hits[i].source.segment;
    const title = extractTitle(hits[i].source.metadata) || key;
    if (!allEntries[key]) {
      allEntries[key] = {
        key: key,
        title: title,
        active: false,
        formulas: [],
      };
    }
    const newMath = getFormula(hits[i].math_ids[0], hits[i].source.text);
    allEntries[key]['formulas'].push(newMath);
    allEntries[key].active = false;
  }
}
