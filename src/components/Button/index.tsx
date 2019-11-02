import * as React from 'react';
import styles from './Button.module.css';
import {getButtonText} from '../../util/buttonText';

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
  const text = getButtonText(props.text);
  return (
    <button
      className={`${styles.mybutton}${
        props.className ? ' ' + props.className : ''
      }`}
      onClick={props.onClick}
      disabled={props.disabled}
      type={props.type}
      form={props.form}>
      {text}
    </button>
  );
}
