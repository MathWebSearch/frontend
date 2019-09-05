import * as React from 'react';
import '../css/PreviewWindow.css';
import {MathML} from './MathML';
import {colors} from '../util/Colors';
/**
 * function that looks through a string of a mahtml formula that and replaces
 * the mathcolor of all queryvariables with a different color
 *
 * @param {string} mathstring the xml of the math that should be presented as
 * string
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

interface PreviewWindowProps {
  mathstring: string;
}

export function PreviewWindow(props: PreviewWindowProps) : JSX.Element {
  const {mathstring} = props;
  if ('' === mathstring) {
    return (
      <div className="PreviewWindow">
        <b>Error with Math Preview</b>
      </div>
    );
  }
  // this colors the qvar in the right color
  // it depends that hopfully nothing else has the attribute mathcolor = red
  const colored = colorVar(mathstring);
  return (
    <div className="PreviewWindow">
      <MathML mathstring={colored} />
    </div>
  );
}
