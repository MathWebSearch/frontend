import React from 'react';
import './css/MWS_Footer.css';
import kwarc from './img/kwarc_logo.png'
import fau from './img/fau_logo.png'

export function MwsFooter() {
  return (
    <div className="Footer">
      <div >
        Powered by <a href="http://search.mathweb.org/">MathWebSearch</a>
      </div>
      <div className="footer">
        <a href="http://kwarc.info/" className="footlink">
            <img src={kwarc} alt="KWARC research group" />
        </a>
        <a href="https://fau.de" className="footlink">
            <img src={fau}alt="FAU Erlangen-Nürnberg" />
        </a>
      </div>
    </div>
  );
}
