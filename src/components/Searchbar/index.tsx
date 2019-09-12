import * as React from 'react';
import {ExampleButton, SymbolButton} from './Buttons';
import {Store} from '../../store/Store';
import {triggerSearchAction, updateInputTextAction} from '../../store/Actions';
import styles from './SearchBar.module.css';

/*
 * The searchbar with the buttons
 * */
export function SearchBar() {
  const {state, dispatch} = React.useContext(Store);
  const textInput: React.RefObject<HTMLInputElement> = React.createRef();
  const {input_text, input_formula} = state;

  const updateandFocus = (text: string) => {
    dispatch(updateInputTextAction(text));
    textInput && textInput.current && textInput.current.focus();
  };

  const inputHandler = async (event: React.SyntheticEvent) => {
    const target: HTMLInputElement = event.target as HTMLInputElement;
    updateandFocus(target.value);
    event.preventDefault();
  };

  const insertAtCursorPosition = (text: string) => {
    if (!textInput || !textInput.current) {
      return;
    }
    const oldvalue = textInput.current.value || '';
    const pos = textInput.current.selectionStart || 0;
    const newvalue = `${oldvalue.slice(0, pos)} ${text} ${oldvalue.slice(pos)}`;
    updateandFocus(newvalue);
  };
  const submitHandler = (event: React.SyntheticEvent) => {
    // searchAction(dispatch)(answsize, input_formula);
    dispatch(triggerSearchAction());
    event.preventDefault();
  };

  return (
    <div className={styles.SearchBar}>
      <form id="form1" onSubmit={submitHandler}>
        <input
          autoFocus
          type="text"
          value={input_text}
          onChange={inputHandler}
          ref={textInput}
          className={styles.textInput}
        />
        <button
          className={styles.clearButton}
          type="button"
          onClick={() => updateandFocus('')}
          disabled={input_text === ''}>
          &times;
        </button>
        <br />
      </form>
      <button type="submit" form="form1" disabled={!input_formula}>
        Search
      </button>
      {ExampleButton(submitHandler, updateandFocus)}
      {SymbolButton(insertAtCursorPosition)}
    </div>
  );
}
