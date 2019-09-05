import * as React from 'react';
import '../css/SearchBar.css';
import DropDownButton from './DropDownButton';
import {commands} from '../config/commands';
import {examples} from '../config/examples';

interface Props {
  text: string;
  submitHandler: any;
  inputHandler: any;
}

/*
* The search with the buttons
* */

export class SearchBar extends React.Component<Props, {}> {
  textInput: any;
  constructor(props: Props) {
    super(props);
    this.textInput = React.createRef();
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.insertAtCursorPosition = this.insertAtCursorPosition.bind(this);
  }

  componentDidMount() {
    this.textInput.current.focus();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.text !== this.props.text) {
      this.textInput.current.focus();
    }
  }

  insertAtCursorPosition(text: string) {
    const oldvalue = this.textInput.current.value;
    const pos = this.textInput.current.selectionStart;
    const newvalue = `${oldvalue.slice(0, pos)} ${text} ${oldvalue.slice(pos)}`;
    this.props.inputHandler(newvalue);
  }

  inputHandler(event: React.SyntheticEvent): void {
    const target: HTMLInputElement = event.target as HTMLInputElement;
    this.props.inputHandler(target.value);
  }

  render() {
    const {text, submitHandler, inputHandler, children} = this.props;
    return (
      <div className="SearchBar">
        <form id="form1" onSubmit={submitHandler}>
          <input
            type="text"
            value={text}
            onChange={event => inputHandler(event.target.value)}
            ref={this.textInput}
            className="textInput"
          />
          <button
            className="clearButton"
            type="button"
            onClick={() => inputHandler('')}
            disabled={text === ''}>
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
          hoverHandler={(element: string) => inputHandler(element)}
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
            this.insertAtCursorPosition(element)
          }
          list={commands}
          reducer={(element: string) => {
            return {text: element, clickarg: element};
          }}
        />
        {children}
      </div>
    );
  }
}
