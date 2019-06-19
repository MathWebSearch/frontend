import React from 'react';
import MathJax from 'react-mathjax-preview';
// import ReactHtmlParser from 'react-html-parser';

export class MathML extends React.Component {
  render() {
    let pmml = this.props.mathstring.replace(/m:/g, '');
    pmml = pmml.replace(
      /<semantics[\s\S]*>[\s\S]*<annotation/,
      '<semantics><annotation',
    );
    if (!pmml) {
      return;
    }
    // return <div>{ReactHtmlParser(pmml)}</div>;
    return <MathJax math={String.raw`${pmml}`} />;
  }
}
