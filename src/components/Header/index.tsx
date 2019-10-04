import * as React from 'react';
import styles from './Header.module.css';
import {Link} from '@reach/router';
import {Stats} from '../Stats';
import {GoUpButton, GoDownButton} from '../Buttons/NavigationButtons';
import {ChangeAggregationButton} from '../Buttons/AggregationButton';
import {OpenAllButton, CloseAllButton} from '../Buttons/ExpandButtons';
import {SizeButton} from '../Searchbar/Buttons';

export interface Props {
  brandingTitle: string;
  brandingLink: string;
}

export function Header(props: Props) {
  return (
    <div className={styles.header}>
      <a
        className={styles.corpus}
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
      <Stats />
      <div>
        <GoUpButton />
        <GoDownButton />
        <OpenAllButton />
        <CloseAllButton />
        <SizeButton />
        <ChangeAggregationButton />
      </div>
      <br style={{clear: 'both'}} />
    </div>
  );
}
