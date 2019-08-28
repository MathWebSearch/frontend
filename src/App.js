import React from 'react';
import Controller from './components/Controller';
import {Header} from './components/Header';
import {Footer} from './components/Footer';
import './css/App.css';

function App() {
  return (
    <div className="App">
      <Header
        corpusName={'nLab'}
        corpusLink={'https://ncatlab.org/nlab/show/HomePage'}
      />
      <br />
      <Controller />
      <br />
      <Footer />
    </div>
  );
}

export default App;
