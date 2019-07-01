import React from 'react';

const examples = [
  //  Name                    Text                LaTeX Math
  ['Sequence', 'sequence', '?a \\rightarrow ?b \\rightarrow ?c'],
  ['Path n-groupoid', 'path n-groupoid', 'P_?n(?x)'],
  ['Another example', '', '?a^{op} \\otimes ?a'],
  ['Plus', '', '?a + ?b'],
  ['Multiplicative Disjunction', '', '\\parr'],
  ['Everything', '', '?x'],
  ['2x2-Matrix', '', '\\array{?a & ?b \\\\ ?c & ?d}'],
];

class ExampleButton extends React.Component {
  // TODO: take out state and move it to controller
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      exampleClickHandler: props.exampleClickHandler,
    };
    this.onClickHandler = this.onClickHandler.bind(this);
    this.exampleClickHandler = this.exampleClickHandler.bind(this);
  }

  onClickHandler() {
    const expanded = this.state.expanded;
    this.setState({expanded: !expanded});
  }
  exampleClickHandler(example) {
    this.setState({expanded: false});
    this.state.exampleClickHandler(example);
  }
  render() {
    if (!this.state.expanded) {
      return (
        <div>
          <button type="button" onClick={this.onClickHandler}>
            Examples
          </button>
        </div>
      );
    }
    return (
      <div>
        <ul>
          {examples.map(e => (
            <li
              key={examples.indexOf(e)}
              onClick={() => this.exampleClickHandler(e[2])}>
              {e[0]}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ExampleButton;
