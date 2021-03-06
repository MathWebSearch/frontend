import * as React from 'react';
import styles from './ToolTip.module.css';
import tooltips from '../../config/tooltips.json';
import {Store} from '../../store/Store';
import {changeTooltipsAction} from '../../store/Actions';
import {CheckBox} from '../CheckBox';
import {getButtonText} from '../../util/buttonText';

/**
 * Wrapper to get tooltips
 * */
export function ToolTip(props: {
  children: React.ReactChild;
  text: string;
}): JSX.Element {
  const tooltiptext = gettooltiptext(props.text);
  const {
    state: {tooltips},
  } = React.useContext(Store);
  const [active, setActive] = React.useState(false);
  return (
    <div
      className={styles.tooltip}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}>
      {active && tooltips ? (
        <span className={styles.tooltiptext}>{tooltiptext}</span>
      ) : null}
      {props.children}
    </div>
  );
}

/**
 * CheckBox to enable/disable the tooltips
 * */
export function ToolTipToogle(): JSX.Element {
  const {
    state: {tooltips},
    dispatch,
  } = React.useContext(Store);
  return (
    <CheckBox
      text={getButtonText('tooltips')}
      checked={tooltips}
      onChange={() => dispatch(changeTooltipsAction(!tooltips))}
    />
  );
}

/**
 * Function to get the text out of the tooltip json
 **/
const gettooltiptext = (key: string) => {
  switch (key) {
    case 'aggregationbotton':
      return tooltips.aggregationbotton;
    case 'openall':
      return tooltips.openall;
    case 'closeall':
      return tooltips.closeall;
    case 'goup':
      return tooltips.goup;
    case 'godown':
      return tooltips.godown;
    case 'size':
      return tooltips.size;
    case 'showmore':
      return tooltips.showmore;
    case 'examples':
      return tooltips.examples;
    case 'symbols':
      return tooltips.symbols;
    case 'clear':
      return tooltips.clear;
    default:
      return '';
  }
};
