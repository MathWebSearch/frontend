import * as React from 'react';
import styles from './Header.module.css';
import Link from 'next/link';
import {Stats} from '../Stats';
import {GoUpButton, GoDownButton} from '../Buttons/NavigationButtons';
import {ChangeAggregationButton} from '../Buttons/AggregationButton';
import {OpenAllButton, CloseAllButton} from '../Buttons/ExpandButtons';
import {ShowMoreButton} from '../Buttons/ShowMoreButton';
import {SizeButton} from '../Buttons/SizeButton';
import {ToolTip, ToolTipToogle} from '../ToolTip';
import {Store} from '../../store/Store';
import {getButtonText} from '../../util/buttonText';

export interface Props {
  brandingTitle: string;
  brandingLink: string;
}
/**
 * The Headbar with buttons and navigation
 **/
export function Header(props: Props) {
  const {dispatch} = React.useContext(Store);
  const reset = () => dispatch({type: 'RESET'});
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
          <Link href="/">
            <a className={styles.navlink} onClick={reset}>
              {getButtonText('home')}
            </a>
          </Link>
          <Link href="/about">
            <a className={styles.navlink} onClick={reset}>
              {getButtonText('about')}
            </a>
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
      <div className={styles.statsbox}>
        <Stats />
      </div>
      <div className={styles.rightcorner}>
        <ToolTipToogle />
        <ToolTip text="aggregationbotton">
          <ChangeAggregationButton />
        </ToolTip>
      </div>
    </div>
  );
}
