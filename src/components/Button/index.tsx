import * as React from 'react';
import styles from './Button.module.css';

/**
 * Wrapper around button to bring css
 * */
export function Button(props: {
  className?: string;
  text: string;
  onClick?: (event?: React.MouseEvent) => void;
  disabled?: boolean;
  type?: 'button' | 'submit';
  form?: string;
}): JSX.Element {
  return (
    <button
      className={`${styles.mybutton}${
        props.className ? ' ' + props.className : ''
      }`}
      onClick={props.onClick}
      disabled={props.disabled}
      type={props.type}
      form={props.form}>
      {props.text}
    </button>
  );
}
