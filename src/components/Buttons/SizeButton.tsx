import * as React from 'react';
import DropDownButton from '../Button/DropDownButton';
import {Store} from '../../store/Store';
import {updateansizeAction} from '../../store/Actions';
/*
 * returns a button to modify the answer size
 * */

export function SizeButton(): JSX.Element {
  const {state, dispatch} = React.useContext(Store);
  const list = Array.from(Array(5).keys()).map(e => {
    return `${e * 10 || 1}`;
  });
  return (
    <DropDownButton
      name={`Result size: ${state.answsize}`}
      clickHandler={(element: string) => {
        dispatch(updateansizeAction(Number(element)));
      }}
      reducer={(e: string) => {
        return {text: e, clickarg: e};
      }}
      list={list}
    />
  );
}
