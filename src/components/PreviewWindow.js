import React from 'react';
import PropTypes from 'prop-types';
import '../css/PreviewWindow.css';
import {MathML} from './MathML';
import {colors} from '../util/Colors';

function colorVar(mathstring) {
  const parser = new DOMParser();
  let i = 0;
  let dict = {};
  const doc = parser.parseFromString(mathstring, 'text/html');
  Array.from(doc.getElementsByTagName('*')).forEach(node => {
    if (node.getAttribute('mathcolor') === 'red') {
      if (!(node.innerHTML in dict)) {
        dict[node.innerHTML] = i++;
      }
      node.setAttribute('mathcolor', colors[dict[node.innerHTML]]);
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
