import * as React from 'react';
import styles from './ResultList.module.css';
import {Store} from '../../store/Store';
import {searchAction} from '../../store/Actions';
import {Spinner} from '.././Progress';

import AggregatedResultListEntry from './AggregatedResultListEntry';

/**
 * Function component the displays the results as List
 * has as state the aggregation and if the expandAll/closeall was clicked
 * */
export default function ResultList(): JSX.Element | null {
  const {state, dispatch} = React.useContext(Store);
  const {
    allEntries,
    input_formula,
    limitmin,
    answsize,
    triggerSearch,
    aggregation,
  } = state;

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

  return (
    <div className={styles.ResultList}>
      <AggregatedResultListEntry allEntries={allEntries} kind={aggregation} />
    </div>
  );
}
