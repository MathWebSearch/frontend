import React from 'react';
import PropTypes from 'prop-types';
import '../css/ResultListEntry.css';

export function ResultListEntry(props) {
  const {id, active, title, formulas, clickHandler} = props;

  var inner;
  if (active) {
    inner = <div>{formulas} </div>;
  }
  return (
    <div className="ResultListEntry">
      <b onClick={() => clickHandler(id)}>{title}</b>
      {inner}
    </div>
  );
}

ResultListEntry.propTypes = {
  id: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  formulas: PropTypes.array.isRequired,
  clickHandler: PropTypes.func.isRequired,
};
