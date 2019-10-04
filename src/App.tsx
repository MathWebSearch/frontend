import * as React from 'react';

import {Router, RouteComponentProps} from '@reach/router';

import {Header} from './components/Header';
import {Footer} from './components/Footer';

import {StoreProvider} from './store/Store';
import {SearchInterface} from './pages/Search';
import {About} from './pages/About';

import {ReportError} from './components/ReportError';

import {BRANDING_TITLE, BRANDING_URL} from './config/';

const RouterPage = (
  props: {pageComponent: JSX.Element} & RouteComponentProps,
) => props.pageComponent;
/**
 * Sceleton of the app
 * */
function App() {
  return (
    <StoreProvider>
      <ReportError />
      <Header brandingTitle={BRANDING_TITLE} brandingLink={BRANDING_URL} />
      <br />
      <div className="App">
        <Router>
          <RouterPage pageComponent={<SearchInterface />} path="/" default />
          <RouterPage pageComponent={<About />} path="/about" />
        </Router>
      </div>
      <br />
      <Footer />
    </StoreProvider>
  );
}
export default App;
