import React from 'react';
import PropTypes from 'prop-types';
import '../css/SearchBar.css';

export class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }
  componentDidMount() {
    this.textInput.current.focus();
  }
  render() {
    const {text, submitHandler, inputHandler, exampleButton} = this.props;
    return (
      <div className="SearchBar">
        <form onSubmit={submitHandler}>
          <input
            type="text"
            value={text}
            onChange={inputHandler}
            ref={this.textInput}
          />
          <br />
          <input type="submit" value="Search" />
          {exampleButton}
        </form>
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
