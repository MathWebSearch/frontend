import React from 'react';
// import MathJax from 'react-mathjax-preview';
import ReactHtmlParser from 'react-html-parser';

class MathML extends React.Component {
  constructor(props) {
    super(props);
    this.state = {math: props.mathstring};
  }

  componentDidMount() {
    const {math} = this.state;
    const pmml = math.replace(
      /<semantics[\s\S]*>[\s\S]*<annotation/,
      '<semantics><annotation',
    );

    this.setState({
        math: pmml.replace(/m:/, '')
    });
  }
  render() {
    const {math} = this.state;
    if (!math) {
      return;
    }
    return <div>{ReactHtmlParser(this.state.math)}</div>;
    // return <MathJax math={String.raw`${this.state.math}`} />;
  }
}

export default MathML;
