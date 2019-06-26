import React from 'react';
import PropTypes from 'prop-types';
import '../css/PreviewWindow.css';
// import ReactHtmlParser from 'react-html-parser';
import {MathML} from './MathML';


export function PreviewWindow(props) {
  const {mathstring} = props;
  if ('' === mathstring) {
    return (
      <div className="PreviewWindow">
        <b>Error with Math Prieview</b>
      </div>
    );
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
