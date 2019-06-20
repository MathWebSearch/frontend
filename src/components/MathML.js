import React from 'react';
import MathJax from 'react-mathjax-preview';
import ReactHtmlParser from 'react-html-parser';
import '../css/MathML.css';

export class MathML extends React.Component {
  constructor(props) {
    super(props);
    this.state = {useMathJax: false};
  }

  componentDidMount() {
    const agent = navigator.userAgent;
    const useMathJax = !(
      (agent.indexOf('Gecko') > -1 && agent.indexOf('KHTML') === -1) ||
      agent.match(/MathPlayer/)
    );
    this.setState({useMathJax: useMathJax});
  }
  render() {
    let pmml = this.props.mathstring.replace(/m:/g, '');
    pmml = pmml.replace(
      /<semantics[\s\S]*>[\s\S]*<annotation/,
      '<semantics><annotation',
    );
    if (!pmml) {
      return;
    }
    if (this.state.useMathJax) {
      return <MathJax math={String.raw`${pmml}`} />;
    }

    return <div>{ReactHtmlParser(pmml)}</div>;
  }
}
