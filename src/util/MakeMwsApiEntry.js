import React from 'react';
import {MathML} from '../components/MathML';
import '../css/ApiEntry.css';
import {colors} from './Colors.js';
import {getElementBySimpleXpath, find_attribute_value} from './simpleXpath';

// the one parser to parse them all?
const parser = new DOMParser();

function extractUrl(source) {
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

/**
 * extracts the xmlID form the semantics node
 * @param {subterm} string mathml as a string
 * @return {string} xmlID
 * */
function extractXMLID(subterm) {
  try {
    const subtermDoc = parser.parseFromString(subterm, 'text/xml');
    const semantics = subtermDoc.getElementsByTagName('m:semantics')[0];
    const xmlID = semantics.firstElementChild.getAttribute('xml:id');
    return xmlID;
  } catch {
    console.log(`no xmlID found`);
  }
}

const sortbyename = (a, b) => {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
};

function findandcolorQvar(xmlID, qvars, sourceDoc) {
  // search the right cmml node
  const node = find_attribute_value(sourceDoc, 'xref', xmlID);
  if (!node) {
    return;
  }
  // lookup table for colors, that the same variable gets always the same
  // color
  let dict = {};
  // sort to get a deterministic order for the colors
  qvars.sort(sortbyename);
  // console.log(qvars);
  qvars.forEach(entry => {
    const {name, xpath} = entry;
    let curr = getElementBySimpleXpath(xpath, node);
    // lookup for colors, if we have this variable for the first time
    // pick new color
    if (!(name in dict)) {
      dict[name] = Object.keys(dict).length % colors.length;
    }
    // take the xref and search for the presentation part of this node
    const xref = curr.getAttribute('xref');
    curr = find_attribute_value(sourceDoc, 'xml:id', xref);
    if (curr) {
      curr.setAttribute('mathcolor', colors[dict[name]]);
    }
  });
}

function highlightFormula(source, subterm, qvars) {
  // new way to highlight the right part of subterm:
  // find the xmlid of the subterm and look for that xmlid in the source and
  // highlight it
  try {
    const xmlID = extractXMLID(subterm);
    const sourceDoc = parser.parseFromString(source, 'text/html');
    const node = find_attribute_value(sourceDoc, 'xml:id', xmlID);
    if (node) {
      node.setAttribute('class', 'Highlighted');
    }
    findandcolorQvar(xmlID, qvars, sourceDoc);
    return sourceDoc.activeElement.innerHTML;
  } catch {
    console.log('no highlighting possible');
    return source;
  }
}

/**
 * creates an jsx element containg for every query variable the substition
 * @param {array} subst the subst array from the api reply
 * @return {jsx}
 * */
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

/**
 * This function assambles an entry for a single search hit
 *
 * @param {object} hit: the hit object as it comes from the mwsapi
 * @param {string} text: the text of the page
 * @param {array} qvars: array that contains the name and xpath of the
 * query variables
 *
 * @return {jsx-element} this is how a single hit is represented
 *
 * */
function getFormula(hit, text, qvars) {
  const url = extractUrl(hit.source);
  const local_id = hit.url;
  const xpath = hit.xpath;
  // console.log(xpath);
  const source = highlightFormula(hit.source, hit.subterm, qvars);
  const context = extractSurroundingWords(text, `math${local_id}`);
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

export function MakeEntries(hits, allEntries, qvars, aggregate = 'segment') {
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
    const newMath = () =>
      getFormula(hits[i].math_ids[0], hits[i].source.text, qvars);

    allEntries[key].formulas.push(newMath);
  }
}
