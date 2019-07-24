import React from 'react';
import PropTypes from 'prop-types';
import '../css/SearchBar.css';

export class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
  }
  componentDidMount() {
    this.textInput.current.focus();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.text !== this.props.text) {
      this.textInput.current.focus();
    }
  }
  render() {
    const {text, submitHandler, inputHandler, exampleButton} = this.props;
    return (
      <div className="SearchBar">
        <form id="form1" onSubmit={submitHandler}>
          <input
            type="text"
            value={text}
            onChange={inputHandler}
            ref={this.textInput}
            className="textInput"
          />
          <br />
        </form>
        <button type="submit" form="form1">
          Search
        </button>
        {exampleButton}
      </div>
    );
  }
}

SearchBar.propTypes = {
  text: PropTypes.string.isRequired,
  submitHandler: PropTypes.func.isRequired,
  inputHandler: PropTypes.func.isRequired,
  exampleButton: PropTypes.element.isRequired,
};
