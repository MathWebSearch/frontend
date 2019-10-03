import React from 'react';
import {Taggregation} from '../../interfaces';
import styles from './AggregationButton.module.css';
import {BRANDING_TITLE} from '../../config';
import {Store} from '../../store/Store';
import {changeAggregationAction} from '../../store/Actions';

export function ChangeAggregationButton(props: {
  className: string;
}): JSX.Element {
  const {
    state: {aggregation},
    dispatch,
  } = React.useContext(Store);
  const toggleAggregation = () => {
    const newaggr: Taggregation = aggregation === 'None' ? 'Title' : 'None';
    dispatch(changeAggregationAction(newaggr));
  };
  return (
    <div className={props.className}>
      <label className={styles.container}>
        {`group formulas by ${BRANDING_TITLE} Document`}
        <input
          type="checkbox"
          checked={aggregation === 'Title'}
          onChange={toggleAggregation}
        />
        <span className={styles.checkmark} />
      </label>
    </div>
  );
}
