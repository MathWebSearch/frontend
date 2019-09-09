import * as React from 'react';
import MathJax from 'react-mathjax-preview';
import styles from './MathML.module.css';

interface MathMLProps {
  mathstring: string;
}

export default function MathML(props: MathMLProps) {
  const agent = navigator.userAgent;
  const useMathJax = !(
    (agent.indexOf('Gecko') > -1 && agent.indexOf('KHTML') === -1) ||
    agent.match(/MathPlayer/)
  );
  let pmml = props.mathstring.replace(/m:/g, '');
  if (!pmml) {
    return null;
  }
  if (useMathJax) {
    //cut out alle the annotations that mathjax works
    pmml = pmml.replace(/<annotation[\s\S]*>[\s\S]*<\/annotation[\S]*>/g, '');
    return <MathJax className={styles.Math} math={pmml} />;
  }

  return <div className={styles.Math} dangerouslySetInnerHTML={{__html: pmml}} />;
}
