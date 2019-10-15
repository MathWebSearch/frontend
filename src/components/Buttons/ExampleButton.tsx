import * as React from 'react';
import DropDownButton from '../Button/DropDownButton';
import {examples} from '../../config';
import {useSearchBar} from '../Searchbar';
import {ToolTip} from '../ToolTip';

/*
 * Function that returns the ExampleButton that updates onhover the text
 * in the searchbar and triggers the search on click
 */
export function ExampleButton(): JSX.Element | null {
  const {updateandFocus, submitHandler} = useSearchBar();

  if (!examples) {
    return null;
  }
  return (
    <ToolTip text="examples">
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
    </ToolTip>
  );
}
