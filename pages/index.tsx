import * as React from 'react';

import {SearchBar} from '../src/components/Searchbar';
import {PreviewWindow} from '../src/components/PreviewWindow';
import ResultList from '../src/components/ResultList';
import {ProgressBar} from '../src/components/Progress';

/**
 * The page for the normal search interface
 * */
export default function SearchInterface(): JSX.Element {
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
