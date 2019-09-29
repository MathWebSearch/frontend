import {errorLog} from '../config';

/**
 * @param string of xpath
 * @param element starting element
 * */
export function getElementBySimpleXpath(xpath: string, element: any) {
  try {
    let elem = element;
    let xpatharr = convertXpath(xpath);
    while (xpatharr.length > 0) {
      let n = xpatharr.shift() || 0;
      // TODO: not sure why this happens but sometimes it take s a wrong way
      if (n < elem.children.length) {
        elem = elem.children[n];
      } else {
        // in case that there are not engouh children go one down?
        if (!elem.firstElementChild) {
          elem = elem.nextElementSibling;
        } else {
          elem = elem.firstElementChild;
          xpatharr.unshift(n - 1);
        }
      }
    }
    return elem;
  } catch {
    // yeah shit happens but then when not highlight something
    errorLog("didn't find something in simpleXpath");
    return;
  }
}

/**
 * Function that takes a xpath expression as string and converts it to a array
 * of index to children
 * @param {string} xpath
 * @return {array} index
 * */

export function convertXpath(xpath: string): Array<number> {
  let xpatharr = xpath
    .split('/')
    .join('')
    .split('[')
    .join('')
    .split(']')
    .join('')
    .split('*');
  xpatharr.shift();
  return xpatharr.map(function(e) {
    return parseInt(e) - 1; //xpath is one-based
  });
}

/**
 * This function tries to find an element with an attribute of value
 * @param {HTMLDocument} doc
 * @param {string} attribute
 * @param {string} value
 * @retrun node
 *
 * */
export function find_attribute_value(
  doc: HTMLDocument,
  attribute: string,
  value: string,
): HTMLElement {
  const node = Array.prototype.find.call(doc.getElementsByTagName('*'), e => {
    return e.getAttribute(attribute) === value;
  });
  return node;
}
