import * as React from 'react';
import styles from './Header.module.css';
import {Link} from '@reach/router';
import {Stats} from '../Stats';
import {GoUpButton, GoDownButton} from '../Buttons/NavigationButtons';
import {ChangeAggregationButton} from '../Buttons/AggregationButton';
import {OpenAllButton, CloseAllButton} from '../Buttons/ExpandButtons';
import {ShowMoreButton} from '../Buttons/ShowMoreButton';
import {SizeButton} from '../Buttons/Buttons';
import {ToolTip, ToolTipToogle} from '../ToolTip';

export interface Props {
  brandingTitle: string;
  brandingLink: string;
}
/**
 * The Headbar with buttons and navigation
 **/
export function Header(props: Props) {
  return (
    <div className={styles.header}>
      <a
        className={styles.brandinglogo}
        href={props.brandingLink}
        target="_blank"
        rel="noopener noreferrer">
        {props.brandingTitle}
      </a>
      <div className={styles.MWSTitle}>
        <b> MathWebSearch</b>
        <nav className={styles.navbar}>
          <Link to="/" className={styles.navlink}>
            Home
          </Link>
          <Link to="/about" className={styles.navlink}>
            {' '}
            More Information
          </Link>
        </nav>
      </div>
      <div className={styles.buttonpairs}>
        <ToolTip text="goup">
          <GoUpButton />
        </ToolTip>
        <ToolTip text="godown">
          <GoDownButton />
        </ToolTip>
      </div>
      <div className={styles.buttonpairs}>
        <ToolTip text="openall">
          <OpenAllButton />
        </ToolTip>
        <ToolTip text="closeall">
          <CloseAllButton />
        </ToolTip>
      </div>
      <div className={styles.buttonpairs}>
        <ToolTip text="size">
          <SizeButton />
        </ToolTip>
        <ToolTip text="showmore">
          <ShowMoreButton />
        </ToolTip>
      </div>
      <div className={styles.buttonbox}>
        <ToolTip text="aggregationbotton">
          <ChangeAggregationButton />
        </ToolTip>
      </div>
      <div className={styles.rightcorner}>
        <Stats />
        <ToolTipToogle />
      </div>
    </div>
  );
}
