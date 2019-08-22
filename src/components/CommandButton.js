import React from 'react';
import PropTypes from 'prop-types';
import {commands} from '../config/commands';

export default class CommandButton extends React.Component {
  state = {expanded: false};

  toggle = () => {
    this.setState(({expanded}) => ({expanded: !expanded}));
  };

  close = () => {
    this.setState({expanded: false});
  };
  closeand = fkt => event => {
    fkt(event);
    this.close();
  };

  render() {
    const {inputHandler} = this.props;
    const {expanded} = this.state;

    return (
      <div className={'DropDown' + (expanded ? ' active' : '')}>
        <button className="DropDownbtn" onClick={this.toggle}>
          Symbols
        </button>
        <div className="DropDownContent" onMouseLeave={this.close}>
          {commands.map((e, index) => (
            <div key={index} onClick={this.closeand(() => inputHandler(e))}>
              {e}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

CommandButton.propTypes = {
  inputHandler: PropTypes.func.isRequired,
};
