import * as React from 'react';
import Subsitutions from './Substitutions';
import {MathML} from './MathML';
import {highlightFormula} from '../util/formulaeHighlighting';
import {extractSurroundingWords} from '../util/extractFunctions';
import '../css/ApiEntry.css';
import {IFormulaHit} from '../Backend/client.d';

/**
 * This function assambles an entry for a single search hit
 * */
export default function FormulaHit(props: IFormulaHit): JSX.Element {
  const {
    url,
    xpath,
    local_id,
    substituitons: subst,
    text,
    source,
    subterm,
    queryvariablesxpath: qvars,
  } = props;
  const newsource = highlightFormula(source, subterm, qvars);
  const context = extractSurroundingWords(text, `math${local_id}`);
  console.log(context);
  return (
    <div className="Content">
      <span className="FlexContainer">
        <div> {context.before}</div>
        <MathML mathstring={newsource} />
        <div> {context.after} </div>
      </span>
      <Subsitutions subst={subst} />
      {xpath.length > 20 ? (
        <span className="FlexContainer">
          <b className="Flex1">{'match : '}</b>
          <MathML mathstring={subterm} />
        </span>
      ) : null}
      {url ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={ev => {
            ev.stopPropagation();
          }}>
          Go to source
        </a>
      ) : null}
    </div>
  );
}
