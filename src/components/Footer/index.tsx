import * as React from 'react';
import styles from './Footer.module.css';
import kwarc from '../../img/kwarc_logo.png';
import fau from '../../img/fau_logo.png';
import odk from '../../img/odk_logo.png';
import eu from '../../img/eu.svg';

function PictureLink(props: {url: string; pic: any; alt: string}): JSX.Element {
  return (
    <a
      href={props.url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.footlink}>
      <img src={props.pic} alt={props.alt} />
    </a>
  );
}

export function Footer(): JSX.Element {
  return (
    <div className={styles.Footer}>
      <div>
        Powered by <a href="http://search.mathweb.org/">MathWebSearch</a>
      </div>
      <div className={styles.footer}>
        <PictureLink url="https://kwarc.info/" pic={kwarc} alt="KWARC research group" />
        <PictureLink url="https://fau.de/" pic={fau} alt="FAU Erlangen-Nürnberg" />
        <PictureLink url="https://opendreamkit.org/" pic={odk} alt="OpenDreamKit" />
        <PictureLink url="https://europa.eu/" pic={eu} alt="EU" />
      </div>
    </div>
  );
}
