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
  answsize: 10,
  triggerSearch: false,
  progress: 0,
  aggregation: 'None',
};

/*
 * reducer function maybe find a better sollution for the typing so that
 * maybe that is not always the same
 * */
function reducer(state: IState, action: IAction): IState {
  switch (action.type) {
      case 'UPDATE_INPUT_TEXT': /* Fall through */
    case 'CONVERT': /* Fall through */
    case 'SEARCH': /* Fall through */
    case 'TRIGGER_SEARCH': /* Fall through */
    case 'SHOW_MORE': /* Fall through */
    case 'UPDATE_ANSSWIZE': /* Fall through */
    case 'UPDATE_PROGRESS': /* Fall through */
    case 'CHANGE_AGGREGATION': /* Fall through */
        return {...state, ...action.payload};
    case 'RESET':
      return initialState;
    case 'DEFAULT': /* Fall through */
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
