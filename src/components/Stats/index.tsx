import * as React from 'react';
import {Store} from '../../store/Store';
import styles from './Stats.module.css';
import {getButtonText} from '../../util/buttonText';

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
        {getButtonText('statsentries')
          .replace('LENGTH', allEntries.length)
          .replace('TOTAL', total)}
      </span>{' '}
      <div>{getButtonText('statstime').replace('TIME', took.toFixed(2))}</div>
    </div>
  );
}
