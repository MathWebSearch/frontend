import * as React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const THEME_NR = process.env.REACT_APP_THEME_NR
  ? process.env.REACT_APP_THEME_NR
  : '1';

import(`./Themes/theme${THEME_NR}.css`)
  .then(() => ReactDOM.render(<App />, document.getElementById('root')))
  .catch(() =>
    ReactDOM.render(
      <div> couldn't load theme</div>,
      document.getElementById('root'),
    ),
  );
