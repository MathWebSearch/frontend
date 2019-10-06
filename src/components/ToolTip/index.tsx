import * as React from 'react';
import styles from './ToolTip.module.css';
import tooltips from '../../config/tooltips.json';

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
  return (
    <div className={styles.tooltip}>
      <span className={styles.tooltiptext}>{tooltiptext}</span>
      {props.children}{' '}
    </div>
  );
}
