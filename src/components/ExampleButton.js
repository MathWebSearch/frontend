import React from 'react';
import PropTypes from 'prop-types';
import '../css/ExampleButton.css';

const examples = [
  //  Name                    Text                LaTeX Math
  ['Everything', '', '?x'],
  ['Sequence', 'sequence', '?a \\rightarrow ?b \\rightarrow ?c'],
  ['Path n-groupoid', 'path n-groupoid', 'P_?n(?x)'],
  ['Another example', '', '?a^{op} \\otimes ?a'],
  ['Plus', '', '?a + ?b'],
  ['Multiplicative Disjunction', '', '\\parr'],
  ['2x2-Matrix', '', '\\array{?a & ?b \\\\ ?c & ?d}'],
  ['Yoneda embedding', '', '?Y : ?C \\to [?C^{op}, Set]'],
  ['range', '', '\\range{0}{10}'],
];

export default class ExampleButton extends React.Component {
  state = {expanded: false};

  toggle = () => {
    this.setState(({expanded}) => ({expanded: !expanded}));
  }

  close = () => {
    this.setState({expanded: false});
  }

  render() {
    const {exampleInputHandler, exampleSubmitHandler} = this.props;
    const {expanded} = this.state;

    return (
      <div className={"DropDown"  + (expanded ? " active" : "")}>
        <button className="DropDownbtn" onClick={this.toggle}>Examples</button>
        <div className="DropDownContent">
          {examples.map(e => (
            <div
              key={examples.indexOf(e)}
              onMouseOver={() => exampleInputHandler(e[2])}
              onMouseUp={exampleSubmitHandler}
              onClick={this.close}>
              {e[0]}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

ExampleButton.propTypes = {
  exampleInputHandler: PropTypes.func.isRequired,
  exampleSubmitHandler: PropTypes.func.isRequired,
};
