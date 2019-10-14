import * as React from 'react';
import {ExampleButton, SymbolButton} from '../Buttons/Buttons';
import {Store} from '../../store/Store';
import {triggerSearchAction, updateInputTextAction} from '../../store/Actions';
import styles from './SearchBar.module.css';

/**
 * custom hook that offers manipulation of the ref thats in the state and is
 * for the searchbar
 * */

export function useSearchBar() {
  const {state, dispatch} = React.useContext(Store);
  const {input_formula, textInputRef} = state;

  const updateandFocus = (text: string) => {
    dispatch(updateInputTextAction(text));
    textInputRef && textInputRef.current && textInputRef.current.focus();
  };

  React.useEffect(() => {
    textInputRef.current && textInputRef.current.focus();
  });

  const inputHandler = (event: React.SyntheticEvent) => {
    const target: HTMLInputElement = event.target as HTMLInputElement;
    updateandFocus(target.value);
    event.preventDefault();
  };

  const insertAtCursorPosition = (text: string) => {
    if (!textInputRef || !textInputRef.current) {
      return;
    }
    const oldvalue = textInputRef.current.value || '';
    const pos = textInputRef.current.selectionStart || 0;
    const newvalue = `${oldvalue.slice(0, pos)} ${text} ${oldvalue.slice(pos)}`;
    updateandFocus(newvalue);
  };
  const submitHandler = (event: React.SyntheticEvent) => {
    input_formula !== null && dispatch(triggerSearchAction());
    event.preventDefault();
  };

  return {updateandFocus, inputHandler, insertAtCursorPosition, submitHandler};
}

/*
 * The searchbar with the buttons
 * */
export function SearchBar() {
  const {state} = React.useContext(Store);
  const {
    input_text,
    input_formula,
    current_formula,
    limitmin,
    answsize,
    triggerSearch,
    textInputRef,
  } = state;
  const {updateandFocus, inputHandler, submitHandler} = useSearchBar();
  React.useEffect(() => {
    textInputRef.current.focus();
  });

  return (
    <div
      className={styles.SearchBar}
      onMouseEnter={() =>
        answsize < limitmin &&
        input_formula === current_formula &&
        updateandFocus(input_text)
      }>
      <form id="form1" onSubmit={submitHandler}>
        <input
          autoFocus
          type="text"
          value={input_text}
          onChange={inputHandler}
          ref={textInputRef}
          placeholder={
            'Insert Key Phrase (written in LaTeX with ?a, ?b, ... for query variables)'
          }
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
      <div className={styles.buttonbar}>
        <button
          type="submit"
          form="form1"
          disabled={
            !input_formula || input_formula === current_formula || triggerSearch
          }>
          Search
        </button>
        <ExampleButton />
        <SymbolButton />
      </div>
    </div>
  );
}
