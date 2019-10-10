import * as React from 'react';
import {Store} from '../../store/Store';
import {changeExpandAllAction} from '../../store/Actions';
/**
 * custom hook that manges the state if open all /close all was clicked
 * */
export function useExpand() {
  const {dispatch} = React.useContext(Store);

  const setExpandAll = (val: boolean | undefined) => {
    dispatch(changeExpandAllAction(val));
  };
  /* callback to expand all*/
  const exp = () => {
    setExpandAll(true);
    setTimeout(() => setExpandAll(undefined), 10);
  };
  /* callback to close all*/
  const close = () => {
    setExpandAll(false);
    setTimeout(() => setExpandAll(undefined), 10);
  };
  return {exp, close};
}

export function OpenAllButton(props?: {className?: string}): JSX.Element {
  const {exp} = useExpand();
  return (
    <button {...props} onClick={exp}>
      Open All
    </button>
  );
}

export function CloseAllButton(props?: {className?: string}): JSX.Element {
  const {close} = useExpand();
  return (
    <button {...props} onClick={close}>
      Close All
    </button>
  );
}
