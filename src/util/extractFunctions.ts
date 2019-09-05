// the one parser to parse them all?
const parser = new DOMParser();

/**
 * looks in the mathelement for an real url
 * */
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

/**
 * function to get the title out of the metadata
 * */
function extractTitle(metastring: string): string {
  try {
    const htmlDoc = parser.parseFromString(metastring, 'text/html');
    const title = htmlDoc.getElementsByTagName('title')[0].innerText;
    return title.replace(/\n/g, '').trim();
  } catch {
    return '';
  }
}

interface IsurroundingWords {
  before: Array<string>;
  after: Array<string>;
}
/**
 * looks through the text and takes up to 10 words before and after mathid
 * @param text the text of the document
 * @param mathid the mathid of the formula that should be in the text
 * @return IsurroundingWords of the words from before and after the mathid
 * */
function extractSurroundingWords(
  text: string,
  mathid: string,
): IsurroundingWords {
  const textsplit = text.split(' ').filter(e => e !== '');
  const index = textsplit.findIndex(e => e.match(new RegExp(`.*${mathid}.*`)));
  let before: string[] = [];
  let after: string[] = [];
    console.log('no index', mathid);
  if (-1 === index) {
    return {before, after};
  }
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
 * @param  string mathml as a string
 * @return  xmlID
 * */
function extractXMLID(subterm: string): string {
  try {
    const subtermDoc = parser.parseFromString(subterm, 'text/xml');
    const semantics = subtermDoc.getElementsByTagName('m:semantics')[0]
      .firstElementChild;
    if (semantics) {
      const xmlID = semantics.getAttribute('xml:id');
      if (xmlID) {
        return xmlID;
      }
    }
    throw new Error('no xmlID');
  } catch {
    throw new Error(`no xmlID found found in ${subterm}`);
  }
}

export {extractUrl, extractTitle, extractSurroundingWords, extractXMLID};
