import * as React from 'react';

/**
 *  function to detect if there is need for scrolling and that hopfully works in every browser
 * */
const scrollMaxY = (): number => {
  return (
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight
  );
};

/*
 * function to return a button to go Up or down if possible
 * */
export function GoDownButton(props?: {className?: string}): JSX.Element | null {
  return typeof window.scrollTo === 'function' ? (
    <button {...props} onClick={() => window.scrollTo(0, scrollMaxY())}>
      Go down
    </button>
  ) : null;
}

export function GoUpButton(props?: {className?: string}): JSX.Element | null {
  return typeof window.scrollTo === 'function' ? (
    <button {...props} onClick={() => window.scrollTo(0, 0)}>
      Go up
    </button>
  ) : null;
}
