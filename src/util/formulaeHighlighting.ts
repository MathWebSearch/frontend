import {extractXMLID} from './extractFunctions';
import {colors} from './Colors';
import {getElementBySimpleXpath, find_attribute_value} from './simpleXpath';

/**
 * sort function to sort qvars alphabetical by there name
 * */
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

export function highlightFormula(source, subterm, qvars) {
  // new way to highlight the right part of subterm:
  // find the xmlid of the subterm and look for that xmlid in the source and
  // highlight it
  try {
    const xmlID = extractXMLID(subterm);
    const parser = new DOMParser();
    const sourceDoc = parser.parseFromString(source, 'text/html');
    const node = find_attribute_value(sourceDoc, 'xml:id', xmlID);
    if (node) {
      node.setAttribute('class', 'Highlighted');
    }
    findandcolorQvar(xmlID, qvars, sourceDoc);
    if (sourceDoc.activeElement) {
      return sourceDoc.activeElement.innerHTML;
    }
  } catch {
    console.log('no highlighting possible');
  }
  return source;
}
