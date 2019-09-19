import * as React from 'react';
import {IState, IAction} from '../interfaces';

const getURL = (): string => {
  const location = window.location.toString().split('?query-math=');
  if (location.length < 2) {
    return '';
  }
  const query = decodeURI(location.pop() || '');
  return query;
};

const initialState: IState = {
  input_text: getURL(),
  input_formula: null,
  current_formula: null,
  total: 0,
  limitmin: 0,
  answsize: 20,
  triggerSearch: false,
  progress: 0,
};

/*
 * reducer function maybe find a better sollution for the typing so that
 * maybe that is not always the same
 * */
function reducer(state: IState, action: IAction): IState {
  switch (action.type) {
    case 'UPDATE_INPUT_TEXT':
      return {...state, ...action.payload};
    case 'CONVERT':
      return {...state, ...action.payload};
    case 'SEARCH':
      return {...state, ...action.payload};
    case 'TRIGGER_SEARCH':
      return {...state, ...action.payload};
    case 'SHOW_MORE':
      return {...state, ...action.payload};
    case 'UPDATE_ANSSWIZE':
      return {...state, ...action.payload};
    case 'UPDATE_PROGRESS':
      if (state.progress !== action.payload.progress) {
        return {...state, ...action.payload};
      }
      return state;
    case 'RESET':
      return initialState;
    case 'DEFAULT':
    default:
      return state;
  }
}

export const Store = React.createContext<IState | any>({state: initialState});

export function StoreProvider(props: any): JSX.Element {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <Store.Provider value={{state, dispatch}}>{props.children} </Store.Provider>
  );
}
