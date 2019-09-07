import * as React from 'react';
import '../css/SearchBar.css';
import DropDownButton from './DropDownButton';
import {commands} from '../config/commands';
import {examples} from '../config/examples';

import {Store} from '../store/Store';
import {
  convertAction,
  searchAction,
  updateInputTextAction,
} from '../store/Actions';

/*
 * The searchbar with the buttons
 * */
export function SearchBar() {
  const {state, dispatch} = React.useContext(Store);
  const textInput: React.RefObject<HTMLInputElement> = React.createRef();
  const {input_text, answsize, input_formula} = state;

  const updateandConvert = (text: string) => {
    dispatch(updateInputTextAction(text));
    convertAction(dispatch)(text);
    textInput && textInput.current && textInput.current.focus();
  };

  const inputHandler = async (event: React.SyntheticEvent) => {
    const target: HTMLInputElement = event.target as HTMLInputElement;
    updateandConvert(target.value);
    event.preventDefault();
  };

  const insertAtCursorPosition = (text: string) => {
    if (!textInput || !textInput.current) {
      return;
    }
    const oldvalue = textInput.current.value || '';
    const pos = textInput.current.selectionStart || 0;
    const newvalue = `${oldvalue.slice(0, pos)} ${text} ${oldvalue.slice(pos)}`;
    updateandConvert(newvalue);
  };
  const submitHandler = (event: React.SyntheticEvent) => {
    searchAction(dispatch)(answsize, input_formula);
    event.preventDefault();
  };

  return (
    <div className="SearchBar">
      <form id="form1" onSubmit={submitHandler}>
        <input
          autoFocus
          type="text"
          value={input_text}
          onChange={inputHandler}
          ref={textInput}
          className="textInput"
        />
        <button
          className="clearButton"
          type="button"
          onClick={() => updateandConvert('')}
          disabled={input_text === ''}>
          &times;
        </button>
        <br />
      </form>
      <button type="submit" form="form1">
        Search
      </button>
      <DropDownButton
        name="Examples"
        clickHandler={(_: string, event: React.SyntheticEvent) =>
          submitHandler(event)
        }
        list={examples}
        hoverHandler={(element: string) => updateandConvert(element)}
        reducer={(element: Array<string>) => {
          return {
            text: element[0],
            clickarg: element[2],
            hoverarg: element[2],
          };
        }}
      />
      <DropDownButton
        name="Symbols"
        clickHandler={(element: string, _: React.SyntheticEvent) =>
          insertAtCursorPosition(element)
        }
        list={commands}
        reducer={(element: string) => {
          return {text: element, clickarg: element};
        }}
      />
    </div>
  );
}
