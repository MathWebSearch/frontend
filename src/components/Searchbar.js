import React from 'react';
import PropTypes from 'prop-types';
import '../css/SearchBar.css';
import CommandButton from './CommandButton';

export class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.insertAtCursorPosition = this.insertAtCursorPosition.bind(this);
  }
  componentDidMount() {
    this.textInput.current.focus();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.text !== this.props.text) {
      this.textInput.current.focus();
    }
  }
  insertAtCursorPosition(text) {
    const oldvalue = this.textInput.current.value;
    const pos = this.textInput.current.selectionStart;
    const newvalue = `${oldvalue.slice(0, pos)}${text}${oldvalue.slice(pos)}`;
    this.props.inputHandler(newvalue);
  }

  inputHandler(event) {
    const input_text = event.target.value;
    this.props.inputHandler(input_text);
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
          <br />
        </form>
        <button type="submit" form="form1">
          Search
        </button>
        {children}
        <CommandButton inputHandler={this.insertAtCursorPosition} />
      </div>
    );
  }
}

SearchBar.propTypes = {
  text: PropTypes.string.isRequired,
  submitHandler: PropTypes.func.isRequired,
  inputHandler: PropTypes.func.isRequired,
};
