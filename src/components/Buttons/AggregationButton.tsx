import React from 'react';
import {Taggregation} from '../../interfaces';
import styles from '../ResultList/ResultList.module.css';
import {BRANDING_TITLE} from '../../config';

/*
 * custom hook that manges the state for the aggregation
 * */
export function useAggregation() {
  const [aggregation, setAggregation] = React.useState<Taggregation>('None');

  const toggleAggregation = () => {
    /* first close every thing */
    aggregation === 'None' ? setAggregation('Title') : setAggregation('None');
  };
  return {aggregation, toggleAggregation};
}

interface ITAprops {
  aggregation: Taggregation;
  onChange: () => void;
}

export function ToggleAggregationButton(props: ITAprops): JSX.Element {
  const {aggregation, onChange} = props;
  return (
    <div className={styles.item}>
      <label className={styles.container}>
        {`group formulas by ${BRANDING_TITLE} Document`}
        <input
          type="checkbox"
          checked={aggregation === 'Title'}
          onChange={onChange}
        />
        <span className={styles.checkmark} />
      </label>
    </div>
  );
}
