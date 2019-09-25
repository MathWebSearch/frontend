import * as React from 'react';
import styles from './ResultList.module.css';
import {Store} from '../../store/Store';
import {searchAction, showMoreAction} from '../../store/Actions';
import {Spinner} from '.././Progress';
import {BRANDING_TITLE} from '../../config';
import {Taggregation} from '../../interfaces';

import AggregatedResultListEntry from './AggregatedResultListEntry';

/**
 *  function to detect if there is need for scrolling and that hopfully works in every browser
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
 * boolean context is set to true if expandAll was clicked and false if closeall was clicked
 * undefined is initial State
 */
export const expandContext = React.createContext(undefined);

/*
 * custom hook that manges the state if open all /close all was clicked
 * */
function useExpand() {
  const [expandAll, setExpandAll] = React.useState();
  /* callback to expand all*/
  const exp = () => {
    setExpandAll(true);
    setTimeout(() => setExpandAll(undefined), 10);
  };
  /* callback to close all*/
  const close = () => {
    setExpandAll(false);
    setTimeout(() => setExpandAll(undefined), 10);
  };
  return {expandAll, exp, close};
}

/*
 * custom hook that manges the state for the aggregation
 * */
function useAggregation() {
  const [aggregation, setAggregation] = React.useState<Taggregation>('None');

  const toggleAggregation = () => {
    /* first close every thing */
    aggregation === 'None' ? setAggregation('Title') : setAggregation('None');
  };
  return {aggregation, toggleAggregation};
}

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
    current_formula,
    limitmin,
    answsize,
    triggerSearch,
    took,
  } = state;

  const {expandAll, exp, close} = useExpand();
  const {aggregation, toggleAggregation} = useAggregation();

  React.useEffect(() => {
    /* trigger the api request if needed */
    const search = async (formula: string) =>
      dispatch(await searchAction(answsize, formula, limitmin, allEntries));
    triggerSearch && search(input_formula);
  }, [triggerSearch, answsize, limitmin, allEntries, dispatch, input_formula]);

  if (!allEntries) {
    /* show loading indictor only when searching */
    return triggerSearch ? <Spinner /> : null;
  }

  const curlength = allEntries.length;

  return (
    <div className={styles.ResultList}>
      <span>
        Showing {curlength} of <b>{total}</b> formulas
      </span>{' '}
      <div>The daemon used {took.toFixed(4)} seconds for the last query</div>
      <div className={styles.ResultListTopLine}>
        <button className={styles.item} onClick={exp}>
          Open All
        </button>
        <button className={styles.item} onClick={close}>
          Close All
        </button>
        {goDownButton()}
        <div className={styles.item}>
          <label className={styles.container}>
            {`group formulas by ${BRANDING_TITLE} Document`}
            <input
              type="checkbox"
              checked={aggregation === 'Title'}
              onChange={() => {
                close();
                toggleAggregation();
              }}
            />
            <span className={styles.checkmark} />
          </label>
        </div>
      </div>
      <expandContext.Provider value={expandAll}>
        <AggregatedResultListEntry allEntries={allEntries} kind={aggregation} />
      </expandContext.Provider>
      <div className={styles.ButtonList}>
        {triggerSearch ? (
          <Spinner />
        ) : curlength < total ? (
          <button
            onClick={() => dispatch(showMoreAction(current_formula))}
            disabled={curlength >= total}>
            Show More
          </button>
        ) : null}
        {goUpButton()}
      </div>
    </div>
  );
}
