import * as React from 'react';
import styles from './ResultList.module.css';
import {Store} from '../../store/Store';
import {searchAction} from '../../store/Actions';
import {Spinner} from '.././Progress';
import {GoUpButton, GoDownButton} from '../Buttons/NavigationButtons';
import {ChangeAggregationButton} from '../Buttons/AggregationButton';
import {ShowMoreButton} from '../Buttons/ShowMoreButton';
import {OpenAllButton, CloseAllButton} from '../Buttons/ExpandButtons';

import AggregatedResultListEntry from './AggregatedResultListEntry';

/**
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
    took,
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

  const curlength = allEntries.length;

  return (
    <div className={styles.ResultList}>
      <span>
        Showing {curlength} of <b>{total}</b> formulas
      </span>{' '}
      <div>The daemon used {took.toFixed(4)} seconds for the last query</div>
      <div className={styles.ResultListTopLine}>
        <OpenAllButton className={styles.item} />
        <CloseAllButton className={styles.item} />
        <GoDownButton className={styles.item} />
        <ChangeAggregationButton className={styles.item} />
      </div>
      <AggregatedResultListEntry allEntries={allEntries} kind={aggregation} />
      <div className={styles.ButtonList}>
        <ShowMoreButton />
        <GoUpButton />
      </div>
    </div>
  );
}
