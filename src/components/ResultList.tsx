import * as React from 'react';
import '../css/ResultList.css';
import {Store} from '../store/Store';
import {searchAction} from '../store/Actions';

import AggregatedResultListEntry from './AggregatedResultListEntry';

/**
 *  function to detect if there is need for scrolling
 * */
const scrollMaxY = (): number => {
  return (
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight
  );
};
/*
 * function to return a button to go Up or down if possible
 * */
const goDownButton = (): React.ReactNode =>
  typeof window.scrollTo === 'function' ? (
    <button onClick={() => window.scrollTo(0, scrollMaxY())}>Go down</button>
  ) : null;
const goUpButton = (): React.ReactNode =>
  typeof window.scrollTo === 'function' ? (
    <button onClick={() => window.scrollTo(0, 0)}>Go up</button>
  ) : null;

/**
 * Context to propagate if expandall/closeall was clicked
 */
export const expandContext = React.createContext(undefined);

export type Taggregation = 'None' | 'Title';
/*
 * Function component the displays the results as List
 * has as state the aggregation and if the expandAll/closeall was clicked
 * */
export default function ResultList(): JSX.Element | null {
  const {state, dispatch} = React.useContext(Store);
  const {
    total,
    allEntries,
    input_formula,
    limitmin,
    answsize,
    triggerSearch,
  } = state;

  const [aggregation, setAggregation] = React.useState<Taggregation>('Title');
  const [expandAll, setExpandAll] = React.useState();

  const showMore = async () => {
    await searchAction(dispatch)(answsize, input_formula, limitmin, allEntries);
  };

  React.useEffect(() => {
    if (triggerSearch) {
      showMore();
    }
  });
  if (!allEntries) {
    return null;
  }

  const exp = () => {
    setExpandAll(true);
    setTimeout(() => setExpandAll(undefined), 10);
  };
  const close = () => {
    setExpandAll(false);
    setTimeout(() => setExpandAll(undefined), 10);
  };
  const curlength = allEntries.length;

  const toggleAggregation = () => {
    /* first close every thing */
    close();
    aggregation === 'None' ? setAggregation('Title') : setAggregation('None');
  };

  return (
    <expandContext.Provider value={expandAll}>
      <div className="ResultList">
        Showing {curlength} of <b>{total}</b> results in {allEntries.length}{' '}
        pages
        <div className="ResultListTopLine">
          <button onClick={close}>Close All</button>
          <button onClick={exp}>Expand All</button>
          {goDownButton()}
          <button onClick={toggleAggregation}>Change Aggregation</button>
        </div>
        <AggregatedResultListEntry allEntries={allEntries} kind={aggregation} />
        <div className="ButtonList">
          <button onClick={showMore} disabled={curlength >= total}>
            Show More
          </button>
          {goUpButton()}
        </div>
      </div>
    </expandContext.Provider>
  );
}
