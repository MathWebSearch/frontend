import * as React from 'react';
import {Store} from '../../store/Store';
import styles from './Stats.module.css';

export function Stats(): JSX.Element | null {
  const {
    state: {took, allEntries, total},
  } = React.useContext(Store);

  if (!allEntries) {
    return null;
  }

  return (
    <div className={styles.Stats}>
      <span>
        Showing {allEntries.length} of <b>{total}</b> formulas
      </span>{' '}
      <div>The daemon used {took.toFixed(4)} seconds for the last query</div>
    </div>
  );
}
