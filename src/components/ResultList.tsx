import * as React from 'react';
import {ResultListEntry} from './ResultListEntry';
import '../css/ResultList.css';
import {IFormulaHit} from '../Backend/client.d';
import {Store} from '../store/Store';
import {searchAction} from '../store/Actions';

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

interface Ipartition {
  [title: string]: IFormulaHit[];
}
type Taggregation = 'None' | 'Title';
/*
 * creates an array of ResultListEntries based on the choosen aggregation
 * */
function aggregate(
  allEntries: IFormulaHit[],
  kind: Taggregation = 'None',
): React.ReactNodeArray {
  switch (kind) {
    case 'Title':
      let partition: Ipartition = {};
      for (let entry of allEntries) {
        const title = entry.title || entry.segment;
        if (!title) {
          continue;
        }
        if (!partition[title]) {
          partition[title] = [];
        }
        partition[title].push(entry);
      }
      return Object.keys(partition).map((title: string, index: number) => (
        <ResultListEntry
          key={index}
          title={title}
          formulahits={partition[title]}
        />
      ));
    case 'None':
    default:
      return allEntries.map((entry: IFormulaHit, index: number) => (
        <ResultListEntry
          key={index}
          title={entry.title || entry.segment}
          formulahits={[entry]}
        />
      ));
  }
}

/*
 * Function component the displays the results as List
 * has as state the aggregation and if the expandAll/closeall was clicked
 * */
export default function ResultList(): JSX.Element | null {
  const {state, dispatch} = React.useContext(Store);
  const {total, allEntries, input_formula, limitmin, answsize} = state;

  const [aggregation, setAggregation] = React.useState<Taggregation>('Title');
  const [expandAll, setExpandAll] = React.useState();

  const showMore = () => {
    searchAction(dispatch)(answsize, input_formula, limitmin, allEntries);
  };

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
        <>{aggregate(allEntries, aggregation)}</>
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
