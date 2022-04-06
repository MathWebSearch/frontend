import { BRANDING_TITLE } from "src/config";
import DOMParser from "./DOMParser";

// the one parser to parse them all?
const parser = new DOMParser();

/**
 * looks in the mathelement for an real url.
 * If not found, tries to get ar5iv link fro segment
 * */
function extractUrl(source: string, segment: string | null): string | null {
  const htmlDoc = parser.parseFromString(source, 'text/html');
  let [ math ] = Array.from(htmlDoc.getElementsByTagName("math"));
  if (!math) {
    [ math ] = Array.from(htmlDoc.getElementsByTagName("m:math"));
  }
  return math?.getAttribute('url') || createAr5Url(source, segment);
}

function getAr5Link(segment: string | null) {
  if (!segment) return null;
  const arxivPattern = /\/([0-9]+\.[0-9]+)\.html$/
  const result = arxivPattern.exec(segment)
  if (!result?.[1]) return null;
  return "https://ar5iv.org/abs/" + result[1]
}

function extractMathId(source: string): string | null {
  const htmlDoc = parser.parseFromString(source, 'text/html');
  let [ math ] = Array.from(htmlDoc.getElementsByTagName("math"));
  if (!math) {
    [ math ] = Array.from(htmlDoc.getElementsByTagName("m:math"));
  }
  return math ? math?.getAttribute('id') : source;
}

function createAr5Url(source: string, segment: string | null) {
  if (BRANDING_TITLE !== "arXiv") return null;
  const documentlink = getAr5Link(segment);
  if (!documentlink) return null;
  const math_id = extractMathId(source) || '';

  return documentlink + '#' + math_id;
}

/**
 * In arXiv dataset, the title is at the beginning of the text and repeated twice. 
 * 
 * For example, if the title is "Slices of co-operations for KGL", the text would be:
 * "Slices of co-operations for KGL Slices of co-operations for KGL <rest of the document>
 */
function extractTitleFromText(text: string) {
  if (BRANDING_TITLE !== "arXiv") return null;
  const firstSection = text.substring(0, 300);
  const words = firstSection.split(' ');
  let numTitleWords = -1;
  for (const [idx, word] of words.entries()) {
    if (idx > 0 && word == words[0]) {
      numTitleWords = idx;
      break;
    }
  }
  return (numTitleWords == -1) ? firstSection : words.slice(0, numTitleWords).join(' ');
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
  if (-1 === index) {
    console.log('extractSurrounding Words: nothing found');
    return { before, after };
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
  return { before: before.reverse(), after: after };
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

export { extractUrl, extractTitle, createAr5Url as extractAr5UrlFromSegment, extractSurroundingWords, extractXMLID, extractTitleFromText };
