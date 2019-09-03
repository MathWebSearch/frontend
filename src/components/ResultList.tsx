import * as React from 'react';
import {ResultListEntry} from './ResultListEntry';
import PropTypes from 'prop-types';
import '../css/ResultList.css';

const scrollMaxY = () => {
  return (
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight
  );
};
interface ResultListProps {
  total: number;
  clickHandler: any;
  allEntries: any;
  showMore: any;
  aggrHandler: any;
}

export function ResultList(props: ResultListProps) {
  const {total, clickHandler, allEntries, showMore, aggrHandler} = props;
  const curlength = allEntries
    .map((e: any) => e['formulas'].length)
    .reduce((acc: number, cur: number) => acc + cur, 0);
  return (
    <div className="ResultList">
      Showing {curlength} of <b>{total}</b> results in {allEntries.length} pages
      <div className="ResultListTopLine">
        <button
          onClick={() =>
            allEntries.forEach((entry: any) => {
              const {key, active} = entry;
              if (active) {
                clickHandler(key);
              }
            })
          }>
          Close All
        </button>
        <button
          onClick={() =>
            allEntries.forEach((entry: any) => {
              const {key, active} = entry;
              if (!active) {
                clickHandler(key);
              }
            })
          }>
          Expand All
        </button>
        {typeof window.scrollTo === 'function' && !scrollMaxY() ? (
          <button onClick={() => window.scrollTo(0, scrollMaxY())}>
            Go down
          </button>
        ) : null}
        <button onClick={aggrHandler}>Change Aggregation</button>
      </div>
      <div>
          {allEntries.map(( entry: any ) => {
          const {key, active, title, formulas} = entry;
          return (
            <ResultListEntry
              key={key}
              id={key}
              active={active}
              title={title}
              formulas={formulas}
              clickHandler={clickHandler}
            />
          );
        })}
      </div>
      <div className="ButtonList">
        <button onClick={showMore} disabled={curlength >= total}>
          Show More
        </button>
        {typeof window.scrollTo === 'function' ? (
          <button onClick={() => window.scrollTo(0, 0)}>Go up</button>
        ) : null}
      </div>
    </div>
  );
}

ResultList.propTypes = {
  total: PropTypes.number.isRequired,
  clickHandler: PropTypes.func.isRequired,
  allEntries: PropTypes.array.isRequired,
  showMore: PropTypes.func.isRequired,
  aggrHandler: PropTypes.func.isRequired,
};
