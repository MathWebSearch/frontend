export function getElementBySimpleXpath(xpath, element) {
  try {
    let elem = element;
    let xpatharr = convertXpath(xpath);
    while (xpatharr.length > 0) {
      let n = xpatharr.shift();
      // TODO: not sure why this happens but sometimes it take s a wrong way
      if (n < elem.children.length) {
        elem = elem.children[n];
      } else {
        if (!elem.firstElementChild) {
          elem = elem.nextElementSibling;
        } else {
          elem = elem.firstElementChild;
        }
        xpatharr.unshift(n - 1);
      }
    }
    return elem;
  } catch {
    // yeah shit happens but then when not highlight something
    console.log("didn't find something in simpleXpath");
    return;
  }
}

export function convertXpath(xpath) {
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
    return parseInt(e) - 1; //xpath is one-based
  });
  return xpatharr;
}

/**
 * This function tries to find an element with an attribute of value
 * @param {HTMLDocument} doc
 * @param {string} attribute
 * @param {string} value
 * @retrun node
 *
 * */
export function find_attribute_value(doc, attribute, value) {
  const node = Array.from(doc.getElementsByTagName('*')).find(e => {
    return e.getAttribute(attribute) === value;
  });
  return node;
}
