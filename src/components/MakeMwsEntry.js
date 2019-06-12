import React from 'react';
import ReactHtmlParser from 'react-html-parser';
// import {find} from 'xpath-react';
// import {evaluate, XPathResult} from 'xpath-react';

function extractFormula(hit) {
  // console.log(hit);
  const local_id = hit.math_ids[0].url;
  // not sure if thats the most clever way, maybe there are some side effects
  const math_tags = ReactHtmlParser(hit.xhtml.replace(/m:/g, ''));
  let math = math_tags.find(
    e => e.type === 'math' && e.props.local_id === local_id,
  );
  if (!math) {
    return;
  }
  // TODO find a way to highlight the xpath
  const xpath = hit.math_ids[0].xpath;
  // let expr = find(math, `./${xpath}`);
  // expr = React.cloneElement(expr, {background: 'yellow'});
  // const xmlid = expr.props['xml:id'];
  // console.log(expr);
  // const qvar = math.props.children.find(e => e.props["xml:id"] === xmlid);
  // console.log(qvar);
  // const result = evaluate(`./${xpath}`, math, null, XPathResult.ANY_TYPE);
  // console.log(result);

  const url = math.props.url;
  return (
    <div className="Content" key={local_id.toString() + xpath} >
      <div>{math}</div>
      {/* <div>{expr} </div> */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={ev => {
          ev.stopPropagation();
          /*keeps it active even if clicked the link*/
        }}>
        Go to nLab
      </a>
    </div>
  );
}
export function MakeEntries(hits, allEntries) {
  for (let i = 0; i < hits.length; i++) {
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(hits[i].xhtml, 'text/html');
    const id_tags = htmlDoc.getElementsByTagName('id');
    if (!id_tags || !id_tags.length) {
      // ignore all hits without an id tag
      console.log('hit without a id');
      continue;
    }
    const key = id_tags[0].innerHTML;
    if (!allEntries[key]) {
      const metadata = htmlDoc.getElementsByTagName('metadata')[0];
      const title = metadata.getElementsByTagName('title')[0].innerHTML;
      allEntries[key] = {
        key: key,
        title: title,
        active: false,
        formulas: [],
      };
    }
    // this prevents that the same formula appears two times in the list
    // at this point we don not use the xpath thing so there is no point in
    // showing the same formula twice
    const newMath = extractFormula(hits[i]);
    allEntries[key]['formulas'].every(e => e.key !== newMath.key) &&
      allEntries[key]['formulas'].push(newMath);
  }
}
