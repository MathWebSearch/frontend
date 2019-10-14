import * as React from 'react';
import styles from './Checkbox.module.css';

/**
 * Custom CheckBox
 * @param className
 * @text
 * @checked
 * @onChange
 * */
export function CheckBox(props: {
  className?: string;
  text: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent) => void;
}): JSX.Element {
  const {className, text, checked, onChange} = props;
  return (
    <div className={className}>
      <label className={styles.container}>
        <input type="checkbox" checked={checked} onChange={onChange} />
        <span className={styles.checkmark} />
        <span className={styles.text}> {text} </span>
      </label>
    </div>
  );
}
