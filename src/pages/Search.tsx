import * as React from 'react';

import {SearchBar} from '../components/Searchbar';
import {PreviewWindow} from '../components/PreviewWindow';
import ResultList from '../components/ResultList';
import {ProgressBar} from '../components/Progress';

export function SearchInterface(): JSX.Element {
  return (
    <>
      <ProgressBar />
      <PreviewWindow />
      <SearchBar />
      <br style={{clear: 'both'}} />
      <ResultList />
    </>
  );
}
