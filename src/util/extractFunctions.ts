// the one parser to parse them all?
const parser = new DOMParser();

function extractUrl(source: string): string {
  const htmlDoc = parser.parseFromString(source, 'text/html');
  let math = htmlDoc.getElementsByTagName('math');
  if (0 === math.length) {
    math = htmlDoc.getElementsByTagName('m:math');
  }
  htmlDoc.getElementsByTagName('m:math');
  const url = math[0].getAttribute('url');
  return url || '';
}

function extractTitle(metastring: string) {
  try {
    const htmlDoc = parser.parseFromString(metastring, 'text/html');
    const title = htmlDoc.getElementsByTagName('title')[0].innerText;
    return title.replace(/\n/g, '').trim();
  } catch {
    return '';
  }
}

function extractSurroundingWords(text: string, mathid: string) {
  const textsplit = text.split(' ').filter(e => e !== '');
  const index = textsplit.findIndex(e => e.match(new RegExp(`.*${mathid}.*`)));
  if (-1 === index) {
    return {};
  }
  let before: string[] = [];
  let after: string[] = [];
  for (let i = 1; i < 10; i++) {
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
function extractXMLID(subterm: string) {
  try {
    const subtermDoc = parser.parseFromString(subterm, 'text/xml');
    const semantics = subtermDoc.getElementsByTagName('m:semantics')[0]
      .firstElementChild;
    if (semantics) {
      const xmlID = semantics.getAttribute('xml:id');
      return xmlID;
    }
  } catch {
    console.log(`no xmlID found`);
  }
}

export {extractUrl, extractTitle, extractSurroundingWords, extractXMLID};
