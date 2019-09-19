import * as React from 'react';
import DropDownButton from './DropDownButton';
import {examples} from '../../config';
import {symbols} from '../../config';
import {Store} from '../../store/Store';
import {updateansizeAction} from '../../store/Actions';

/*
 * Function that returns the ExampleButton that updates onhover the text
 * in the searchbar and triggers the search on click
 */
export function ExampleButton(
  submitHandler: (event: React.SyntheticEvent) => void,
  updateandFocus: (text: string) => void,
): JSX.Element | null {
  if (!examples) {
    return null;
  }
  return (
    <DropDownButton
      name="Examples"
      clickHandler={(_: string, event: React.SyntheticEvent) =>
        submitHandler(event)
      }
      list={examples}
      hoverHandler={(element: string) => updateandFocus(element)}
      reducer={(element: Array<string>) => {
        return {
          text: element[0],
          clickarg: element[2],
          hoverarg: element[2],
        };
      }}
    />
  );
}

/**
 * Function that returns the SymbolButton that inserts the command for an
 * symbol onClick
 **/
export function SymbolButton(
  insertAtCursorPosition: (element: string) => void,
): JSX.Element | null {
  if (!symbols) {
    return null;
  }
  return (
    <DropDownButton
      name="Symbols"
      clickHandler={(element: string, _: React.SyntheticEvent) =>
        insertAtCursorPosition(element)
      }
      list={symbols}
      reducer={(element: string) => {
        return {text: element, clickarg: element};
      }}
    />
  );
}

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
