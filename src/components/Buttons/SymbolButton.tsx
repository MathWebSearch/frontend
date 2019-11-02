import * as React from 'react';
import DropDownButton from '../Button/DropDownButton';
import {symbols} from '../../config';
import {useSearchBar} from '../Searchbar';
import {ToolTip} from '../ToolTip';
/**
 * Function that returns the SymbolButton that inserts the command for an
 * symbol onClick
 **/
export function SymbolButton(): JSX.Element | null {
  const {insertAtCursorPosition} = useSearchBar();

  if (!symbols) {
    return null;
  }
  return (
    <ToolTip text="symbols">
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
    </ToolTip>
  );
}
