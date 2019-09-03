import * as React from 'react';
import {commands} from '../config/commands';

interface State {
    expanded : boolean;
}
interface Props{
    inputHandler: any;
}

export default class CommandButton extends React.Component<Props, State> {
    state :State = {expanded: false};

  toggle = () => {
      this.setState(({expanded} :State) => ({expanded: !expanded}));
  };

  close = () => {
    this.setState({expanded: false});
  };
  closeand = (fkt :any) => ( event : any) => {
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
