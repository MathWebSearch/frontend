import React from 'react';
import Progress from 'react-progress';

export class ProgressBar extends React.Component {
  render() {
    return (
      <div>
        <Progress percent={this.props.percent} height={4} />
      </div>
    );
  }
}
