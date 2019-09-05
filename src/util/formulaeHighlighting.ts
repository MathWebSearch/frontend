import {extractXMLID} from './extractFunctions';
import {colors} from '../config/Colors';
import {getElementBySimpleXpath, find_attribute_value} from './simpleXpath';
import {Iqvar} from '../Backend/client.d';

/**
 * sort function to sort qvars alphabetical by there name
 * */
const sortbyename = (a: Iqvar, b: Iqvar): number => {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
};

/**
 *  Function to the substituions of the queryvariables in sourceDoc and color the in diffrent
 *  colors accordingly to the colors in Colors.js
 **/
interface Icolormap {
  [name: string]: number;
}
function findandcolorQvar(
  xmlID: string,
  qvars: Array<Iqvar>,
  sourceDoc: HTMLDocument,
) {
  // search the right cmml node
  const node = find_attribute_value(sourceDoc, 'xref', xmlID);
  if (!node) {
    return;
  }
  // lookup table for colors, that the same variable gets always the same
  // color
  let dict: Icolormap = {};
  qvars.sort(sortbyename);

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

/*
 * function to apply the highlighting of subterm in source and coloring the
 * qvars in the right color
 * */
export function highlightFormula(
  source: string,
  subterm: string,
  qvars: Array<Iqvar>,
): string {
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
