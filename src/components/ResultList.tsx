import * as React from 'react';
import {ResultListEntry} from './ResultListEntry';
import '../css/ResultList.css';

const scrollMaxY = () => {
  return (
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight
  );
};

const goDown = () =>
  typeof window.scrollTo === 'function' ? (
    <button onClick={() => window.scrollTo(0, scrollMaxY())}>Go down</button>
  ) : null;
const goUp = () =>
  typeof window.scrollTo === 'function' ? (
    <button onClick={() => window.scrollTo(0, 0)}>Go up</button>
  ) : null;

interface ResultListProps {
  total: number;
  allEntries: any;
  showMore: any;
  aggrHandler: any;
}

export const expandContext = React.createContext(false);

export function ResultList(props: ResultListProps) {
  const {total, allEntries, showMore, aggrHandler} = props;
  const curlength = allEntries
    .map((e: any) => e['formulas'].length)
    .reduce((acc: number, cur: number) => acc + cur, 0);

  const [expandAll, setExpandAll] = React.useState();
  const exp = () => {
    setExpandAll(true);
    setTimeout(() => setExpandAll(undefined), 10);
  };
  const close = () => {
    setExpandAll(false);
    setTimeout(() => setExpandAll(undefined), 10);
  };
  return (
    <expandContext.Provider value={expandAll}>
      <div className="ResultList">
        Showing {curlength} of <b>{total}</b> results in {allEntries.length}{' '}
        pages
        <div className="ResultListTopLine">
          <button onClick={close}>Close All</button>
          <button onClick={exp}>Expand All</button>
          {goDown()}
          <button onClick={aggrHandler}>Change Aggregation</button>
        </div>
        <div>
          {allEntries.map((entry: any) => {
            const {key, title, formulas} = entry;
            return (
              <ResultListEntry key={key} title={title} formulas={formulas} />
            );
          })}
        </div>
        <div className="ButtonList">
          <button onClick={showMore} disabled={curlength >= total}>
            Show More
          </button>
          {goUp()}
        </div>
      </div>
    </expandContext.Provider>
  );
}
