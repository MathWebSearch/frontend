import * as React from 'react';
import { Button } from '../Button';
/*
 * function to return a button to go Up or down if possible
 * */
export class GoUpButton extends React.Component<{ className?: string }> {
  private readonly scrollUp = () => {
    window.scrollTo(0, 0);
  };

  render() {
    return <Button {...this.props} onClick={this.scrollUp} text="Go up" />
  }
}

/*
 * function to return a button to go Up or down if possible
 * */
export class GoDownButton extends React.Component<{ className?: string }> {
  private readonly scrollDown = () => {
    const maxY = 
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
    window.scrollTo(0, maxY);
  };

  render() {
    return <Button {...this.props} onClick={this.scrollDown} text="Go down" />
  }
}