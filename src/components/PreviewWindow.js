import React from 'react';
import PropTypes from 'prop-types';
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
function colorVar(mathstring) {
  const parser = new DOMParser();
  let dict = [];
  const doc = parser.parseFromString(mathstring, 'text/html');
  Array.from(doc.getElementsByTagName('*')).forEach(node => {
    // its based on the assumption the qvars are red
    if (node.getAttribute('mathcolor') === 'red') {
      if (node.innerHTML.match(/(\[|\]|.*\.\.\..*)/g)) {
        // This is for the ranges they are also red
        return;
      }
      if (!(dict.includes(node.innerHTML))) {
        // dict[node.innerHTML] = i++ % colors.length;
        dict.push(node.innerHTML);
      }
      // node.setAttribute('mathcolor', colors[dict[node.innerHTML]]);
    }
  });
  // this is needed that we have to keep here the alphabetical order
  // so a needs get an lower index as b and so on
  dict.sort();
  // console.log(dict);
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

  return doc.activeElement.innerHTML;
}

export function PreviewWindow(props) {
  const {mathstring} = props;
  if ('' === mathstring) {
    return (
      <div className="PreviewWindow">
        <b>Error with Math Prieview</b>
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

PreviewWindow.propTypes = {
  mathstring: PropTypes.string.isRequired,
};
