import React from 'react';
import Subsitutions from './Substitutions';
import {MathML} from './MathML';
import {highlightFormula} from '../util/formulaeHighlighting';
import {extractSurroundingWords, extractUrl} from '../util/extractFunctions';
import '../css/ApiEntry.css';

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
export default function FormulaHit(props) {
  const {hit, text, qvars} = props;
  const url = extractUrl(hit.source);
  const local_id = hit.url;
  const xpath = hit.xpath;
  const source = highlightFormula(hit.source, hit.subterm, qvars);
  const context = extractSurroundingWords(text, `math${local_id}`);
  return (
    <div className="Content">
      <span className="FlexContainer">
        <div> {context.before}</div>
        <MathML mathstring={source} />
        <div> {context.after} </div>
      </span>
      <Subsitutions subst={hit.subst} />
      {xpath.length > 20? <span className="FlexContainer">
        <b className="Flex1">{'match : '}</b>
        <MathML mathstring={hit.subterm} />
      </span> : null}
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
