import * as React from 'react';
import styles from './Checkbox.module.css';

/**
 * Custom CheckBox
 * */
export function CheckBox(props: any): JSX.Element {
  const {className, text, checked, onChange} = props;
  return (
    <div className={className}>
      <label className={styles.container}>
        {text}
        <input type="checkbox" checked={checked} onChange={onChange} />
        <span className={styles.checkmark} />
      </label>
    </div>
  );
}
