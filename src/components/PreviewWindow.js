import React from 'react';
import PropTypes from 'prop-types';
import '../css/PreviewWindow.css';
// import ReactHtmlParser from 'react-html-parser';
import MathML from './MathML';

export function PreviewError() {
  return (
    <div>
      <b>Error with Math Prieview</b>
    </div>
  );
}

export function PreviewWindow(props) {
  const {mathstring} = props;
  if ('' === mathstring) {
    return;
  }
  return (
    <div className="PreviewWindow">
      <MathML mathstring={mathstring} />
    </div>
  );
}

PreviewWindow.propTypes = {
  mathstring: PropTypes.string.isRequired,
};
