import React from 'react';
import Controller from './components/Controller';
import {MwsHeader} from './MWS_Header';
import {MwsFooter} from './MWS_Footer';
import './css/App.css';

function App() {
  return (
    <div className="App">
      <MwsHeader
        corpusName={'nLab'}
        corpusLink={'https://ncatlab.org/nlab/show/HomePage'}
      />
      <br />
      <Controller />
      <br />
      <MwsFooter />
    </div>
  );
}

export default App;
