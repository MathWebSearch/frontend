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
];

export default function ExampleButton(props) {
  const {exampleInputHandler, exampleSubmitHandler} = props;
  return (
    <div className="DropDown">
      <button className="DropDownbtn">Examples</button>
      <div className="DropDownContent">
        {examples.map(e => (
          <div
            key={examples.indexOf(e)}
            onMouseOver={() => exampleInputHandler(e[2])}
            onClick={exampleSubmitHandler}>
            {e[0]}
          </div>
        ))}
      </div>
    </div>
  );
}

ExampleButton.protoTypes = {
  exampleInputHandler: PropTypes.func.isRequired,
  exampleSubmitHandler: PropTypes.func.isRequired,
};
