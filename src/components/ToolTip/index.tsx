import * as React from 'react';
import styles from './ToolTip.module.css';
import tooltips from '../../config/tooltips.json';
import {Store} from '../../store/Store';
import {changeTooltipsAction} from '../../store/Actions';

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
    default:
      return '';
  }
};

export function ToolTip(props: {
  children: React.ReactChild;
  text: string;
}): JSX.Element {
  const tooltiptext = gettooltiptext(props.text);
  const {
    state: {tooltips},
  } = React.useContext(Store);
  if (!tooltips) {
    return <>{props.children}</>;
  }
  return (
    <div className={styles.tooltip}>
      {props.children}
      <span className={styles.tooltiptext}>{tooltiptext}</span>
    </div>
  );
}

export function ToolTipToogle(): JSX.Element {
  const {
    state: {tooltips},
    dispatch,
  } = React.useContext(Store);
  return (
    <label>
      Enable Tooltips
      <input
        type="checkbox"
        checked={tooltips}
        onChange={() => dispatch(changeTooltipsAction(!tooltips))}
      />
    </label>
  );
}
