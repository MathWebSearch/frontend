import React from 'react';
import PropTypes from 'prop-types';
import '../css/PreviewWindow.css';
import {MathML} from './MathML';
import {colors} from '../util/Colors';

export function PreviewWindow(props) {
  let {mathstring} = props;
  if ('' === mathstring) {
    return (
      <div className="PreviewWindow">
        <b>Error with Math Prieview</b>
      </div>
    );
  }
  // this colors the qvar in the right color
  // it depends that hopfully nothing else has the attribute mathcolor = red
  let i = 0;
  mathstring = mathstring.replace(
    /mathcolor="red"/g,
    () => `mathcolor="${colors[i++ % colors.length]}"`,
  );
  return (
    <div className="PreviewWindow">
      <MathML mathstring={mathstring} />
    </div>
  );
}

PreviewWindow.propTypes = {
  mathstring: PropTypes.string.isRequired,
};
