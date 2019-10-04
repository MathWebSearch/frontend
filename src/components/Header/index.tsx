import * as React from 'react';
import styles from './Header.module.css';
import {Link} from '@reach/router';

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
      <br style={{clear: 'both'}} />
    </div>
  );
}
