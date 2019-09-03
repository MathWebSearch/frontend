import * as React from 'react';
import PropTypes from 'prop-types';
import '../css/ResultListEntry.css';

interface ResultListEntryProps {
  id: number;
  active: boolean;
  title: string;
  formulas: any;
  clickHandler: any;
}


export function ResultListEntry(props :ResultListEntryProps) {
  const {id, active, title, formulas, clickHandler} = props;

  let inner;
  if (active) {
    inner = <div>{formulas.map(( newMath : any ) => newMath())}</div>;
  }
  return (
    <div className="ResultListEntry">
      <div onClick={() => clickHandler(id)}>
        <b>{title}</b>
      </div>
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
