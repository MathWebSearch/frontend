import * as React from 'react';
import {ResultListEntry} from './ResultListEntry';
import '../css/ResultList.css';
import {IFormulaHit} from '../Backend/client.d';

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
  allEntries: IFormulaHit[];
  showMore: any;
}

const createPartition = (allEntries: IFormulaHit[]): React.ReactNodeArray => {
  let partition = {};
  for (let entry of allEntries) {
    if (!partition[entry.title || entry.segment]) {
      partition[entry.title || entry.segment] = [];
    }
    partition[entry.title || entry.segment].push(entry);
  }
  return Object.keys(partition).map((title: string, index: number) => (
    <ResultListEntry key={index} title={title} formulahits={partition[title]} />
  ));
};

export const expandContext = React.createContext(false);

type Taggregation = 'None' | 'Title';

export function ResultList(props: ResultListProps): JSX.Element {
  const {total, allEntries, showMore} = props;
  const curlength = allEntries.length;
  const [expandAll, setExpandAll] = React.useState();
  const exp = () => {
    setExpandAll(true);
    setTimeout(() => setExpandAll(undefined), 10);
  };
  const close = () => {
    setExpandAll(false);
    setTimeout(() => setExpandAll(undefined), 10);
  };

  const [aggregation, setAggregation] = React.useState<Taggregation>('None');
  const toggleAggregation = () =>
    aggregation === 'None' ? setAggregation('Title') : setAggregation('None');
  return (
    <expandContext.Provider value={expandAll}>
      <div className="ResultList">
        Showing {curlength} of <b>{total}</b> results in {allEntries.length}{' '}
        pages
        <div className="ResultListTopLine">
          <button onClick={close}>Close All</button>
          <button onClick={exp}>Expand All</button>
          {goDown()}
          <button onClick={toggleAggregation}>Change Aggregation</button>
        </div>
        <div>
          {aggregation === 'None'
            ? allEntries.map((entry: IFormulaHit, index: number) => (
                <ResultListEntry
                  key={index}
                  title={entry.title || entry.segment}
                  formulahits={[entry]}
                />
              ))
            : createPartition(allEntries)}
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
