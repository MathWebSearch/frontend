import * as React from 'react';
import '../css/MathML.css';
const MathJax = require('react-mathjax-preview');

interface MathMLProps {
  mathstring: string;
}

export class MathML extends React.Component<MathMLProps, any> {
  render() {
    const agent = navigator.userAgent;
    const useMathJax = !(
      (agent.indexOf('Gecko') > -1 && agent.indexOf('KHTML') === -1) ||
      agent.match(/MathPlayer/)
    );
    let pmml = this.props.mathstring.replace(/m:/g, '');
    if (!pmml) {
      return null;
    }
    if (useMathJax) {
      //cut out alle the annotations that mathjax works
      pmml = pmml.replace(/<annotation[\s\S]*>[\s\S]*<\/annotation[\S]*>/g, '');
      return <MathJax className="Math" math={pmml} />;
    }

    return <div className="Math" dangerouslySetInnerHTML={{__html: pmml}} />;
  }
}
