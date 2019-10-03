import * as React from 'react';
import {Header} from './components/Header';
import {Footer} from './components/Footer';

import {SearchBar} from './components/Searchbar';
import {PreviewWindow} from './components/PreviewWindow';
import ResultList from './components/ResultList';
import {ProgressBar} from './components/Progress';
import {ReportError} from './components/ReportError';

import {StoreProvider} from './store/Store';

import {BRANDING_TITLE, BRANDING_URL} from './config/';

/**
 * sceletion of the app
 * */
function App() {
  return (
    <div className="App">
      <ReportError />
      <Header brandingTitle={BRANDING_TITLE} brandingLink={BRANDING_URL} />
      <br />
      <StoreProvider>
        <ProgressBar />
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
