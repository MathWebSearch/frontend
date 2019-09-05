import * as React from 'react';
const Progress = require('react-progress');

/*
 * Progressbar on the top
 * */

interface Props {
  percent: number;
}
export function ProgressBar(props: Props): JSX.Element {
  return <Progress percent={props.percent} height={4} color={'#4caf50'} />;
}
