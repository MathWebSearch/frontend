import * as React from 'react';
import {Header} from './components/Header';
import {Footer} from './components/Footer';
import './css/App.css';

import {SearchBar} from './components/Searchbar';
import {PreviewWindow} from './components/PreviewWindow';
import ResultList from './components/ResultList';

import {StoreProvider} from './store/Store';

import {BRANDING_TITLE, BRANDING_URL} from './branding';


function App() {
  return (
    <div className="App">
      <Header corpusName={BRANDING_TITLE} corpusLink={BRANDING_URL} />
      <br />
      <StoreProvider>
          <PreviewWindow />
          <SearchBar />
          <br style={{clear: 'both'}} />
          <ResultList />
      </StoreProvider>
      <br />
      <Footer />
    </div>
  );
}

export default App;
