import Link from "next/link";

import * as React from 'react';
import styles from './Footer.module.css';

function PictureLink(props: {href: string; src: any; alt: string, width: number, height: number}): JSX.Element {
  return (
    <a
      href={props.href}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.footlink}>
      <img src={props.src} alt={props.alt} width={props.width} height={props.height} />
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
        <PictureLink href="https://kwarc.info/" src={"/logos/kwarc_logo.png"} alt="KWARC research group" width={80} height={80} />
        <PictureLink href="https://fau.de/" src={"/logos/fau_logo.png"} alt="FAU Erlangen-Nürnberg" width={270} height={52} />
        <PictureLink href="https://opendreamkit.org/" src={"/logos/odk_logo.png"} alt="OpenDreamKit" width={45} height={69} />
        <PictureLink href="https://europa.eu/" src={"/logos/eu.svg"} alt="EU" width={120} height={80} />
        <br />
        <Link href="/imprint">
          <a>
            Imprint
          </a>
        </Link>
        &nbsp;
        <a href={"/disclaimer.txt"}>Legal Disclaimer</a>
      </div>
    </div>
  );
}
