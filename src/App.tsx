import * as React from 'react';
import Controller from './components/Controller';
import {Header} from './components/Header';
import {Footer} from './components/Footer';
import './css/App.css';

import {BRANDING_TITLE, BRANDING_URL} from './branding';

function App() {
  return (
    <div className="App">
      <Header corpusName={BRANDING_TITLE} corpusLink={BRANDING_URL} />
      <br />
      <Controller />
      <br />
      <Footer />
    </div>
  );
}

export default App;
