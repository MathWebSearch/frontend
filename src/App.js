import React from 'react';
import Controller from './components/Controller';
import {MwsHeader} from './MWS_Header';
import {MwsFooter} from './MWS_Footer';

function App() {
  return (
    <div className="App">
      <MwsHeader />
      <br />
      <Controller />
      <br />
      <MwsFooter />
    </div>
  );
}

export default App;
