import * as React from 'react';
import styles from './Button.module.css';

/**
 * Wrapper around button to bring css
 * */
export function Button(props: {
  className?: string;
  text: string;
  onClick: (event?: React.MouseEvent) => void;
  disabled?: boolean;
}): JSX.Element {
  return (
    <button
      className={props.className || styles.mybutton}
      onClick={props.onClick}
      disabled={props.disabled}>
      {props.text}
    </button>
  );
}
