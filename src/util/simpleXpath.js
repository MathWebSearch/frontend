export function getElementBySimpleXpath(xpath, element) {
  // this is stolen from the old frontend
  let xpatharr = convertXpath(xpath);
  let elem = element.getElementsByTagName('m:annotation-xml')[0];
  // console.log(xpath, xpatharr);
  // console.log(elem);
  try {
    while (xpatharr.length > 0) {
      let n = xpatharr.shift();
      // TODO: not sure why this happens but sometimes it take s a wrong way
        if (n < elem.children.length)
            elem = elem.children[n];
        else {
            console.log(xpath);
            console.log(elem);
            console.log(xpatharr);
        break;
        } 
    }
    const xmlID = elem.getAttribute('xml:id');
    // const pmml = element.getElementsByTagName('m:annotation-xml')[0];
    const pmml = element;
    const node = Array.from(pmml.getElementsByTagName('*')).find(e => {
      return e.getAttribute('xref') === xmlID;
    });
    node.setAttribute('class', 'Highlighted');
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
