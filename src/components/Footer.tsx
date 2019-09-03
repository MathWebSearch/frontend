import * as React from 'react';
import '../css/MWS_Footer.css';
import kwarc from '../img/kwarc_logo.png';
import fau from '../img/fau_logo.png';
import odk from '../img/odk_logo.png';

export function Footer() {
  return (
    <div className="Footer">
      <div>
        Powered by <a href="http://search.mathweb.org/">MathWebSearch</a>
      </div>
      <div className="footer">
        <a
          href="http://kwarc.info/"
          target="_blank"
          rel="noopener noreferrer"
          className="footlink">
          <img src={kwarc} alt="KWARC research group" />
        </a>
        <a
          href="https://fau.de"
          target="_blank"
          rel="noopener noreferrer"
          className="footlink">
          <img src={fau} alt="FAU Erlangen-Nürnberg" />
        </a>
        <a
          href="https://opendreamkit.org"
          target="_blank"
          rel="noopener noreferrer"
          className="footlink">
          <img src={odk} alt="OpenDreamKit" />
        </a>
      </div>
    </div>
  );
}
