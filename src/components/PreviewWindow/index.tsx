import * as React from 'react';
import styles from './PreviewWindow.module.css';
import MathML from '.././MathML';
import {colors} from '../../config/Colors';
import {Store} from '../../store/Store';
import {convertAction} from '../../store/Actions';
/**
 * function that looks through a string of a mahtml formula that and replaces
 * the mathcolor of all queryvariables with a different color
 *
 * @param  mathstring the xml of the math that should be presented as
 * string
 * @return mathml as string with colored variables
 */
function colorVar(mathstring: string): string {
  const parser = new DOMParser();
  let dict: Array<string> = [];
  const doc = parser.parseFromString(mathstring, 'text/html');
  Array.prototype.forEach.call(doc.getElementsByTagName('*'), node => {
    // its based on the assumption the qvars are red
    if (node.getAttribute('mathcolor') === 'red') {
      // This is for the ranges they are also red
      if (node.innerHTML.match(/(\[|\]|.*\.\.\..*)/g)) {
        return;
      }
      // found a new variable
      if (!dict.includes(node.innerHTML)) {
        dict.push(node.innerHTML);
      }
    }
  });
  // this is needed that we have to keep here the alphabetical order
  // so a needs get an lower index as b and so on
  dict.sort();
  Array.from(doc.getElementsByTagName('*')).forEach(node => {
    if (node.getAttribute('mathcolor') === 'red') {
      if (dict.includes(node.innerHTML)) {
        node.setAttribute(
          'mathcolor',
          colors[dict.indexOf(node.innerHTML) % colors.length],
        );
      }
    }
  });

  if (doc.activeElement) {
    return doc.activeElement.innerHTML;
  }
  throw new Error('no activeElement!');
}

/**
 * Function component that shows mathml equations
 * @param mathstring the string that should be showed null indcates nothing to show
 * empty string indicates error
 *
 * */
export function PreviewWindow(): JSX.Element | null {
  const {state, dispatch} = React.useContext(Store);
  const {input_text, input_formula: mathstring} = state;
  React.useEffect(() => {
    if (input_text !== '' && mathstring === null) {
      convertAction(dispatch)(input_text);
    }
  });
  if (null === mathstring) {
    return null;
  }
  if ('' === mathstring) {
    return (
      <div className={styles.PreviewWindow}>
        <b>Error with Math Preview</b>
      </div>
    );
  }
  // this colors the qvar in the right color
  // it depends that hopfully nothing else has the attribute mathcolor = red
  const colored = colorVar(mathstring);
  return (
    <div className={styles.PreviewWindow}>
      <MathML mathstring={colored} />
    </div>
  );
}
