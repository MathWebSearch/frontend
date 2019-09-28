import React from 'react';
/*
 * Custom Hook for debounceing a funciton call
 * @param callback function that should be debounced
 * @param wait time that should be minimum between calls of callback
 * */
export function useDebounce(func: Function, wait: number) {
  const timeoutRef = React.useRef<NodeJS.Timeout>();
  if (timeoutRef.current) {
    clearTimeout(timeoutRef.current);
  }
  const timeout = setTimeout(() => func(), wait);
  timeoutRef.current = timeout;
}
