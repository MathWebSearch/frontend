import * as React from 'react';
import Progress from 'react-progress';

interface Props{
    percent: number;
}
export class ProgressBar extends React.Component<Props, {}> {
  render() {
    return (
      <div>
        <Progress percent={this.props.percent} height={4} color={'#4caf50'} />
      </div>
    );
  }
}
