/**
* debounce function takes a function and delays the calls 
* */
type F = (...args: any[]) => any;
export const debounce = (func: F, wait: number): F => {
  let timeout: NodeJS.Timeout;
  return function(this: any, ...args: any[]) {
    const context: any = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
};
