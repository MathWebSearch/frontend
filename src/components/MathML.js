import React from 'react';
import MathJax from 'react-mathjax-preview';
// import ReactHtmlParser from 'react-html-parser';
import '../css/MathML.css';

export class MathML extends React.Component {
  render() {
    const agent = navigator.userAgent;
    const useMathJax = !(
      (agent.indexOf('Gecko') > -1 && agent.indexOf('KHTML') === -1) ||
      agent.match(/MathPlayer/)
    );
    let pmml = this.props.mathstring.replace(/m:/g, '');
    if (!pmml) {
      return;
    }
    if (useMathJax) {
      //cut out alle the annotations that mathjax works
      pmml = pmml.replace(/<annotation[\s\S]*>[\s\S]*<\/annotation[\S]*>/g, '');
      // return <MathJax className="Math" math={String.raw`${pmml}`} />;
      return <MathJax className="Math" math={pmml} />;
    }

    return <div className="Math" dangerouslySetInnerHTML={{__html: pmml}} />;
  }
}
