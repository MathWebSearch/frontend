import * as React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const THEME_NR =
  process.env.REACT_APP_THEME_NR !== undefined
    ? process.env.REACT_APP_THEME_NR
    : '1';

require(`./Themes/theme${THEME_NR}.css`);

ReactDOM.render(<App />, document.getElementById('root'));
